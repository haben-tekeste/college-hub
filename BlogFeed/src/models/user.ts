import mongoose, { Schema } from "mongoose";

// An interface that describes
// properties required to create a User
interface IUser {
  name: string;
  userId: string;
}

// an interface that describes
// the properties of a user model

interface IModel extends mongoose.Model<IDocument> {
  build(User: IUser): IDocument;
}

// an interface that describes the properties
// a user document has

interface IDocument extends mongoose.Document {
  name: string;
  userId: string;
  interests: string[];
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    interests: {
      type: [String],
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        delete ret.interests;
      },
    },
  }
);

UserSchema.statics.build = (user: IUser) => {
  return new User(User);
};

export const User = mongoose.model<IDocument, IModel>("User", UserSchema);
