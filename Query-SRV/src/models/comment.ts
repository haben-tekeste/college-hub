import mongoose, { ObjectId } from "mongoose";
import { ReplyDoc } from "./reply";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { BadRequestError } from "@booki/common";

/**
 * Reviews schema
 * Storage for the books:-
 * Rating &
 * Reviews
 */

interface CommentsModel extends mongoose.Model<CommentsDoc> {
  build(attrs: IComments): CommentsDoc;
  update(attrs: IComments): CommentsDoc;
}

export interface CommentsDoc extends mongoose.Document {
  bookId: string;
  userId: string;
  text: string;
  likes: number;
  reply: ReplyDoc[];
  id: ObjectId;
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
  id: ObjectId;
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
      ref: "User",
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

CommentsSchema.set("versionKey", "version");
CommentsSchema.plugin(updateIfCurrentPlugin);

CommentsSchema.statics.build = (attrs: IComments) => {
  return new Comment({
    bookId: attrs.bookId,
    userId: attrs.userId,
    text: attrs.text,
    reply: attrs.reply,
    likes: attrs.likes,
    _id: attrs.id,
  });
};

CommentsSchema.statics.update = async function (attrs: IComments) {
  const comment = await this.findById(attrs.id);
  if (!comment) throw new BadRequestError("Comment not found");
  comment.likes = attrs.likes;
  return comment;
};

/**
 * Building the comments model
 */

const Comment = mongoose.model<CommentsDoc, CommentsModel>(
  "Comment",
  CommentsSchema
);

export { Comment };
