import {
  Subjects,
  Listener,
  AnswerUpvoted,
  NotFoundError,
} from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Answer } from "../../model/answer";

export class AnswerUpvotedListener extends Listener<AnswerUpvoted> {
  subject: Subjects.AnswerUpvoted = Subjects.AnswerUpvoted;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventAnswerUpvoted;
  durableName = "answer-upvoted-question-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.AnswerUpvoted;
  async onMessage(data: AnswerUpvoted["data"], msg: Msg) {
    const { id, Voter } = data;

    const answer = await Answer.findById(id);
    if (!answer) throw new NotFoundError();

    //
    const userDownvotedPrev = answer.downvotes.voters.findIndex(
      (voter) => voter.toString() === Voter
    );

    if (userDownvotedPrev != -1) {
      answer.downvotes.quantity--;
      answer.downvotes.voters.splice(userDownvotedPrev, 1);
    }

    answer.upvotes.quantity++;
    answer.upvotes.voters.push(Voter);
    await answer.save();
    msg.respond();
  }
}
