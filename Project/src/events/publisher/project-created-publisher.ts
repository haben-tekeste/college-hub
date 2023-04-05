import { Publisher, Subjects, ProjectCreatedEvent } from "@hthub/common";

export class ProjectCreatedPublisher extends Publisher<ProjectCreatedEvent> {
  subject: Subjects.EventProjectCreated = Subjects.EventProjectCreated;
}
