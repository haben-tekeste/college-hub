import { Subjects, Listener, AnswerCreated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Answer } from "../../model/answer";

export class AnswerCreatedListener extends Listener<AnswerCreated> {
  subject: Subjects.AnswerCreated = Subjects.AnswerCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventAnswerCreated;
  durableName = "answer-created-question-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.AnswerCreated;
  async onMessage(data: AnswerCreated["data"], msg: Msg) {
    const { id, author, content, questionId, createdAt } = data;

    const answer = await Answer.findById(id);
    if (answer) throw new Error("Answer already exist, can't duplicate");

    const newAnswer = Answer.build({
      id,
      author,
      content,
      questionId,
      createdAt: new Date(createdAt),
    });
    await newAnswer.save();
    msg.respond();
  }
}
