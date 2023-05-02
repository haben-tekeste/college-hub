import {
  Subjects,
  Publisher,
  EmailApplicationRejectedEvent,
} from "@hthub/common";

export class ApplicationRejectedPublisher extends Publisher<EmailApplicationRejectedEvent> {
  subject: Subjects.EventEmailApplicationRejected =
    Subjects.EventEmailApplicationRejected;
}
