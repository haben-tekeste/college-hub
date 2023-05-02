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
    //
    const userUpvotedPrev = answer.upvotes.voters.findIndex(
      (voter) => voter.toString() === Voter
    );

    if (userUpvotedPrev != -1) {
      answer.upvotes.quantity--;
      answer.upvotes.voters.splice(userUpvotedPrev, 1);
    }

    answer.downvotes.quantity++;
    answer.downvotes.voters.push(Voter);
    await answer.save();
    msg.respond();
  }
}
