import mongoose, { ObjectId } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

/**
 * User schema
 * Storage for the user details
 * this is different from the Auth user model
 * this users model is conserned only in relation to some users book
 */

/**
 * the following interface
 * describes the attributes found on the User schema or tabl
 */

interface IUser {
  id: ObjectId;
  interests: String[];
  name: string;
  email: string;
  avatar: string | undefined;
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the User Schema,
 */

export interface UserDoc extends mongoose.Document {
  id: ObjectId;
  interests: String[];
  name: string;
  email: string;
  avatar: string | undefined;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: IUser): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/doo1ivw33/image/upload/v1682074429/Booki/avatar/6769264_60111_q9wai8.jpg",
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "user" + new Date().toISOString(),
    },
    interests: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: IUser) => {
  return new User({
    _id: attrs.id,
    interests: attrs.interests,
    email: attrs.email,
    name: attrs.name,
  });
};

/**
 * Building the User model
 */

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// exporting the user model
export { User };
