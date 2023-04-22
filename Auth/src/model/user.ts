import mongoose from "mongoose";
import { PasswordManager } from "../utils/passwordManager";

// An interface that describes
// properties required to create user
interface IUser {
  email: string;
  password: string;
  verificationNumber: string;
  expiresAt: Date;
  username:string,
}

// an interface that describes
// the properties of a user model

interface IModel extends mongoose.Model<IDocument> {
  build(usr: IUser): IDocument;
}

// an interface that describes the properties
// a user document has
interface IDocument extends mongoose.Document {
  email: string;
  password: string;
  verificationNumber: string;
  expiresAt: Date;
  isVerified: boolean;
  username:string,
}

const userSchema = new mongoose.Schema(
  {
    username:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationNumber: {
      type: String,
      required:true
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (usr: IUser) => {
  return new User(usr);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // encrypt only when password is changed or created for the first time
    const hash = await PasswordManager.hashPassword(this.get("password"));
    this.set("password", hash);
  }
  next();
});

export const User = mongoose.model<IDocument, IModel>("User", userSchema);
