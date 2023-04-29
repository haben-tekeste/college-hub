import { Publisher, Subjects, ProjectACreatedEvent } from "@hthub/common";

export class ProjectACreatedPublisher extends Publisher<ProjectACreatedEvent> {
  subject: Subjects.EventAProjectCreated = Subjects.EventAProjectCreated;
}
