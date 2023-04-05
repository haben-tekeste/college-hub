import mongoose, { Schema } from "mongoose";

interface ISkill {
  name: string;
}

// An interface that describes
// properties required to create a profile
interface IProfile {
  id: string,
  major: string;
  concentration: string;
  userId: string;
  skills?: ISkill[];
}

// an interface that describes
// the properties of a profile model

interface IModel extends mongoose.Model<IDocument> {
  build(profile: IProfile): IDocument;
}

// an interface that describes the properties
// a profile document has

interface IDocument extends mongoose.Document {
  major: string;
  concentration: string;
  userId: string;
  skills?: ISkill[];
  interests?:string[]
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
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    skills: [
      {
        name: String,
        score: Number,
      },
    ],
    interests:[String]
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
  return new Profile({
    _id:profile.id,
    major: profile.major,
    concentration: profile.concentration,
    userId: profile.userId
  });
};

export const Profile = mongoose.model<IDocument, IModel>(
  "Profile",
  profileSchema
);
