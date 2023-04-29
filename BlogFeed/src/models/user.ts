import mongoose, { Schema } from "mongoose";

// An interface that describes
// properties required to create a User
interface IUser {
  id: string;
  uname: string;
  email: string;
}

// an interface that describes
// the properties of a user model

interface IModel extends mongoose.Model<IDocument> {
  build(User: IUser): IDocument;
}

// an interface that describes the properties
// a user document has

interface IDocument extends mongoose.Document {
  uname: string;
  id: string;
  email: string;
  interests: string[];
}

const UserSchema = new mongoose.Schema(
  {
    uname: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
    },
    email: {
      type: String,
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
  return new User({
    _id: user.id,
    uname: user.uname,
    email: user.email,
  });
};

export const User = mongoose.model<IDocument, IModel>("User", UserSchema);
