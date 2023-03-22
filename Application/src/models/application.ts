import mongoose, { Schema, Document } from "mongoose";

// An interface that describes
// properties required to create a application idea
interface IApplication {
  projectId: string;
  userId: string;
  status: string;
  createdAt: Date;
}

// an interface that describes
// the properties of a application model
interface IModel extends mongoose.Model<IDocument> {
  build(profile: IApplication): IDocument;
}

// an interface that describes the properties
// a application document has
interface IDocument extends mongoose.Document {
  projectId: string;
  userId: string;
  status: string;
  createdAt: Date;
}

const applicationSchema = new mongoose.Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
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

applicationSchema.statics.build = (application: IApplication) => {
  return new Application(application);
};

export const Application = mongoose.model<IDocument, IModel>(
  "Application",
  applicationSchema
);
