import { Subjects, Listener, EmailApplicationApproved } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Email } from "../../mail/sender";

export class ApplicationApprovedListener extends Listener<EmailApplicationApproved> {
  subject: Subjects.EmailApplicationApproved =
    Subjects.EmailApplicationApproved;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventEmailApplicationApproved;
  durableName = "email-approved-application";
  streamName = "mystream";
  deliverSubject = Subjects.EmailApplicationApproved;
  onMessage(data: EmailApplicationApproved["data"], msg: Msg) {
    const { userId: email, message } = data;

    const emailMsg = new Email(
      "osfmvyaxz@scpulse.com",
      email,
      "Application Approved",
      message
    );

    emailMsg.send();

    msg.respond();
  }
}
