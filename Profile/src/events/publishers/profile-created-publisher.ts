import { Publisher, Subjects,ProfileCreatedEvent } from "@hthub/common";

export class ProfileCreatedPublisher extends Publisher<ProfileCreatedEvent>{
    subject: Subjects.EventProfileCreated = Subjects.EventProfileCreated;
}