import mongoose from "mongoose";
import { ReplyDoc, ReplySchema } from "./reply";
/**
 * Reviews schema
 * Storage for the books:-
 * Rating &
 * Reviews
 */

interface CommentsModel extends mongoose.Model<CommentsDoc> {
  build(attrs: IComments): CommentsDoc;
}

export interface CommentsDoc extends mongoose.Document {
  bookId: string;
  userId: string;
  text: string;
  likes: number;
  reply: ReplyDoc[];
}

/**
 * the following interface
 * describes the attributes of a comment table or schema.
 */

interface IComments {
  bookId: string;
  userId: string;
  text: string;
  reply: ReplyDoc[];
  likes: number;
}

/**
 * Comments Schema
 * will be referenced in the Reviews Schema in the
 * comment section.
 */
const CommentsSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    reply: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
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

CommentsSchema.statics.build = (attrs: IComments) => {
  return new Comment({
    bookId: attrs.bookId,
    userId: attrs.userId,
    text: attrs.text,
    reply: attrs.reply,
    likes: attrs.likes,
  });
};

/**
 * Building the comments model
 */

const Comment = mongoose.model<CommentsDoc, CommentsModel>(
  "Comment",
  CommentsSchema
);

export { Comment };
