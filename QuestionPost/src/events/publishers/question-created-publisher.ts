import { Subjects, Publisher, QuestionCreatedEvent } from "@hthub/common";

export class QuestionCreatedPublisher extends Publisher<QuestionCreatedEvent>{
    subject: Subjects.EventQuestionCreated = Subjects.EventQuestionCreated
}