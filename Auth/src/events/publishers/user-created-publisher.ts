import { Subjects, Publisher, EventUserCreated } from "@hthub/common";

export class UserCreatedPublisher extends Publisher<EventUserCreated> {
  subject: Subjects.EventUserCreated = Subjects.EventUserCreated;
}


