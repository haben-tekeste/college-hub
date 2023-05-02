import { Subjects, Listener, EmailApplicationRejected } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Email } from "../../mail/sender";

export class ApplicationRejectedListener extends Listener<EmailApplicationRejected> {
  subject: Subjects.EmailApplicationRejected =
    Subjects.EmailApplicationRejected;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventEmailApplicationRejected;
  durableName = "email-Rejected-application";
  streamName = "mystream";
  deliverSubject = Subjects.EmailApplicationRejected;
  onMessage(data: EmailApplicationRejected["data"], msg: Msg) {
    const { userId: email, message } = data;

    const emailMsg = new Email(
      "osfmvyaxz@scpulse.com",
      email,
      "Application Rejected",
      message
    );

    emailMsg.send();

    msg.respond();
  }
}
