import mongoose, { Schema } from "mongoose";
import { HashManagger } from "../utils/Encrypt";
import { PasswordManager } from "../utils/passwordManager";

// An interface that describes
// properties required to create token
interface IToken {
  userId: string;
  token: string;
}

// an interface that describes
// the properties of a token model

interface IModel extends mongoose.Model<IDocument> {
  build(usr: IToken): IDocument;
}

// an interface that describes the properties
// a token document has

interface IDocument extends mongoose.Document {
  userId: string;
  token: string;
  createAt: Date;
}

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
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

tokenSchema.statics.build = (token: IToken) => {
  return new Token(token);
};

tokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    // encrypt only when password is changed or created for the first time
    const hash = await HashManagger.hashData(this.get("token"));
    this.set("token", hash);
  }
  next();
});

export const Token = mongoose.model<IDocument, IModel>("Token", tokenSchema);
