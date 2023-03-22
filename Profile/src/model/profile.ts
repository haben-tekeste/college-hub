import mongoose, { Schema } from "mongoose";

interface ISkill {
  name: string;
  score: number;
}

interface IExperience {
  title: string;
  company: string;
  period: number;
  isCurrentJob: boolean;
  description: string;
}

// An interface that describes
// properties required to create a profile
interface IProfile {
  major: string;
  concentration: string;
  yearOfStudy: number;
  userId: string;
  summary: string;
  cGPA?: number;
  skills?: ISkill[];
  experience?: IExperience[];
  resume?: string;
}

// an interface that describes
// the properties of a user model

interface IModel extends mongoose.Model<IDocument> {
  build(profile: IProfile): IDocument;
}

// an interface that describes the properties
// a user document has

interface IDocument extends mongoose.Document {
  major: string;
  concentration: string;
  yearOfStudy: number;
  userId: string;
  summary: string;
  cGPA?: number;
  skills?: ISkill[];
  experience?: IExperience[];
  resume?: string;
}

const profileSchema = new mongoose.Schema(
  {
    major: {
      type: String,
      required: true,
    },
    concentration: {
      type: String,
      required: true,
    },
    yearOfStudy: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    cGPA: {
      type: Number,
    },
    skills: [
      {
        name: String,
        score: Number,
      },
    ],
    experiences: [
      {
        title: String,
        company: String,
        period: Number,
        isCurrentJob: Boolean,
        description: String,
      },
    ],
    resume: {
      type: String,
    },
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

profileSchema.statics.build = (profile: IProfile) => {
  return new Profile(profile);
};

export const Profile = mongoose.model<IDocument, IModel>("Profile", profileSchema);
