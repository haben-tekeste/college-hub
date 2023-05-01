import {
  Subjects,
  Listener,
  AnswerDownvoted,
  NotFoundError,
} from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Answer } from "../../model/answer";

export class AnswerDownvotedListener extends Listener<AnswerDownvoted> {
  subject: Subjects.AnswerDownvoted = Subjects.AnswerDownvoted;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventAnswerDownvoted;
  durableName = "answer-downvoted-question-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.AnswerDownvoted;
  async onMessage(data: AnswerDownvoted["data"], msg: Msg) {
    const { id, Voter } = data;

    const answer = await Answer.findById(id);
    if (!answer) throw new NotFoundError();
    if (Voter in answer.downvotes.voters) {
      return msg.respond();
    }
    if (Voter in answer.upvotes.voters) {
      // answer.upvotes.voters.
      const ds = answer.upvotes.voters.filter((ans) => ans === Voter);
      answer.upvotes.quantity--;
      answer.upvotes.voters = ds;
    }

    answer.downvotes.quantity++;
    answer.downvotes.voters.push(Voter);
    await answer.save();
    msg.respond();
  }
}
