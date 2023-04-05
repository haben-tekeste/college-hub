import { Listener, Subjects, ProjectCreated } from "@hthub/common";
import { queueGroupName } from "./queue-group-name";
import { Msg } from "nats";
import { Project } from "../../model/project";

export class ProjectCreatedListener extends Listener<ProjectCreated> {
  subject: Subjects.ProjectCreated = Subjects.ProjectCreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventProjectCreated;
  durableName = "project-created-project-feed-durable";
  streamName = "mystream";
  deliverSubject = Subjects.ProjectCreated;
  async onMessage(data: ProjectCreated["data"], msg: Msg) {
    // check if project already exists
    const project = await Project.findById(data.id);

    if (project) throw new Error("Project already exists");

    const newProject = Project.build({
      id: data.id,
      topic: data.topic,
      description: data.description,
      createdAt: new Date(data.createdAt),
      tags: data.tags,
      postedBy: data.postedBy,
      deadline: new Date(data.deadline),
      skillSet: data.skillSet,
    });

    await newProject.save();
    msg.respond();
  }
}
