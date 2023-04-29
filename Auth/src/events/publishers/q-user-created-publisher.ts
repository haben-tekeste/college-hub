import { Subjects, Publisher, QEventUserCreated } from "@hthub/common";

export class QUserCreatedPublisher extends Publisher<QEventUserCreated> {
    subject: Subjects.EventQUserCreated = Subjects.EventQUserCreated
}