import { Listener, Subjects, ProjectACreated } from "@hthub/common";
import { queueGroupName } from "./queue-group-name";
import { Msg } from "nats";
import { Project } from "../../models/project";

export class ProjectCreatedListener extends Listener<ProjectACreated> {
  subject: Subjects.ProjectACreated = Subjects.ProjectACreated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventAProjectCreated;
  durableName = "project-created-application-durable";
  streamName = "mystream";
  deliverSubject = Subjects.ProjectACreated;
  async onMessage(data: ProjectACreated["data"], msg: Msg) {
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
      applications:[]
    });

    await newProject.save();
    msg.respond();
  }
}
