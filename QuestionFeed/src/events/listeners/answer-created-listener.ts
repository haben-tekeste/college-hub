import { Subjects, Listener, AnswerCreated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Answer } from "../../model/answer";
import { Question } from "../../model/question";
import { NotFoundError } from "@hthub/common";
import { EmailAnswerCreatedPublisher } from "../publishers/email-answer-created-publisher";
import { natswrapper } from "../../nats-wrapper";
import { User } from "../../model/user";

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
    const question = await Question.findById(questionId);
    if (!question) throw new NotFoundError();
    const newAnswer = Answer.build({
      id,
      author,
      content,
      questionId,
      createdAt: new Date(createdAt),
    });
    await newAnswer.save();
    question.answers.push(newAnswer.id);
    await question.save();
    const user = await User.findById(question.author);
    new EmailAnswerCreatedPublisher(natswrapper.Client).publish({
      userId: user?.email!,
      message: "Someone replied to your question " + question.content + "",
    });
    msg.respond();
  }
}
