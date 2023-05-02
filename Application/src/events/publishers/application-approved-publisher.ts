import {
  Subjects,
  Publisher,
  EmailApplicationApprovedEvent,
} from "@hthub/common";

export class ApplicationApprovedPublisher extends Publisher<EmailApplicationApprovedEvent> {
  subject: Subjects.EventEmailApplicationApproved =
    Subjects.EventEmailApplicationApproved;
}
