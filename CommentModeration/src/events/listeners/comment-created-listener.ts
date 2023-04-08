import { Subjects, Listener, CommentCreated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import * as toxicity from "@tensorflow-models/toxicity";
import { CommentModeratedPublisher } from "../publishers/comment-moderated-publisher";
import { natswrapper } from "../../nats-wrapper";

export class CommentCreatedListener extends Listener<CommentCreated> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventCommentCreated;
  durableName = "comment-created-moderation-srv";
  streamName = "mystream";
  deliverSubject = Subjects.CommentCreated;
  async onMessage(data: CommentCreated["data"], msg: Msg) {
    const { id, content, status } = data;
    let commentStatus = "Approved";
    // The minimum prediction confidence.
    const threshold = 0.9;
    const toxicityLabel = [
      "identity_attack",
      "insult",
      "obscene",
      "severe_toxicity",
      "sexual_explicit",
      "threat",
      "toxicity",
    ];

    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
    const model = await toxicity.load(threshold, toxicityLabel);
    const predictions = await model.classify(content);
    // `predictions` is an array of objects, one for each prediction head,
    // that contains the raw probabilities for each input along with the
    // final prediction in `match` (either `true` or `false`).
    // If neither prediction exceeds the threshold, `match` is `null`.
    predictions.forEach((prediction) => {
      if (prediction.results[0].match) {
        commentStatus = "Rejected";
        return;
      }
    });

    await new CommentModeratedPublisher(natswrapper.Client).publish({
      id,
      content,
      status: commentStatus,
    });
    msg.respond()
  }
}
