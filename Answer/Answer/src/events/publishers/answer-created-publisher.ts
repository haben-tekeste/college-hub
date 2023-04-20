import { Subjects,Publisher, AnswerCreatedEvent } from "@hthub/common";

export class AnswerCreatedPublisher extends Publisher<AnswerCreatedEvent> {
    subject: Subjects.EventAnswerCreated = Subjects.EventAnswerCreated
}