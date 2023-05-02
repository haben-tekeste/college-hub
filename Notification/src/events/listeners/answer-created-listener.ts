import { Subjects, Listener, EmailAnswerCreated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Email } from "../../mail/sender";

export class AnswerCreatedListener extends Listener<EmailAnswerCreated> {
  subject: Subjects.EmailAnswerCreated = Subjects.EmailAnswerCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventEmailAnswerCreated;
  durableName = "EMAIL ANSWER ";
  streamName = "mystream";
  deliverSubject = Subjects.EmailAnswerCreated;
  onMessage(data: EmailAnswerCreated["data"], msg: Msg) {
    const { userId: email, message } = data;

    const emailMsg = new Email(
      "osfmvyaxz@scpulse.com",
      email,
      "Question Replied",
      message
    );

    emailMsg.send();

    msg.respond();
  }
}
