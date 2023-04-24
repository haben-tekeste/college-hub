import { Subjects, Listener, QuestionCreated } from "@hthub/common";
import { Msg } from "nats";
import { Question } from "../../model/question";
import { queueGroupName } from "./queue-group-name";
import { elasticClient } from "../../elastic-search";

export class QuestionCreatedListener extends Listener<QuestionCreated> {
  subject: Subjects.QuestionCreated = Subjects.QuestionCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventQuestionCreated;
  durableName = "question-created-question-feed-srv";
  streamName = "mystream";
  deliverSubject = Subjects.QuestionCreated;
  async onMessage(data: QuestionCreated["data"], msg: Msg) {
    const { id, author, title, content, createdAt } = data;

    const question = await Question.findById(id);
    if (question) throw new Error("Question already exist");

    const newQuestion = Question.build({
      id,
      content,
      title,
      createdAt: new Date(createdAt),
      author,
      answers: []
    });

    await newQuestion.save();
    await elasticClient.createPost("Questions", {
      id: newQuestion.id,
      title: newQuestion.title,
      content: newQuestion.content,
    });

    msg.respond();
  }
}
