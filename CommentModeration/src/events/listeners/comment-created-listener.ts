import { Subjects, Listener, CommentCreated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { classifyComment } from "../../toxicity";
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
    const { id, content } = data;
    const commentStatus = await classifyComment(content);

    await new CommentModeratedPublisher(natswrapper.Client).publish({
      id,
      content,
      status: commentStatus,
    });
    msg.respond();
  }
}
