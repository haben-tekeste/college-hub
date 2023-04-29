import { Subjects, Publisher, BEventUserCreated } from "@hthub/common";

export class BUserCreatedPublisher extends Publisher<BEventUserCreated> {
    subject: Subjects.EventBUserCreated = Subjects.EventBUserCreated
}