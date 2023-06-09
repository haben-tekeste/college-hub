import mongoose, { Schema, ObjectId } from "mongoose";

// An interface that describes
// properties required to create a project idea
interface IProject {
  id: string;
  topic: string;
  description: string;
  postedBy: string;
  createdAt: Date;
  deadline: Date;
  skillSet: string[];
  tags: string[];
  applications: ObjectId[];
}

// an interface that describes
// the properties of a project model
interface IModel extends mongoose.Model<IDocument> {
  build(profile: IProject): IDocument;
}

// an interface that describes the properties
// a project document has
export interface IDocument extends mongoose.Document {
  topic: string;
  description: string;
  postedBy: string;
  createdAt: Date;
  deadline: Date;
  skillSet: string[];
  tags: string[];
  applications: ObjectId[];
}

const projectSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
    },
    deadline: {
      type: Schema.Types.Date,
      required: true,
    },
    skillSet: [String],
    tags: [String],
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ],
  },

  {
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

projectSchema.statics.build = (project: IProject) => {
  return new Project({
    _id: project.id,
    topic: project.topic,
    description: project.description,
    deadline: project.deadline,
    tags: project.tags,
    postedBy: project.postedBy,
    createdAt: project.createdAt,
    skillSet: project.skillSet,
    applications: project.applications,
  });
};

export const Project = mongoose.model<IDocument, IModel>(
  "Project",
  projectSchema
);
