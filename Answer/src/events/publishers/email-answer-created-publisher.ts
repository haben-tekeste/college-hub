import { Subjects, Publisher, EmailAnswerCreatedEvent } from "@hthub/common";

export class EmailAnswerCreatedPublisher extends Publisher<EmailAnswerCreatedEvent> {
  subject: Subjects.EventEmailAnswerCreated = Subjects.EventEmailAnswerCreated;
}
