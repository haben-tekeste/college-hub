import { BadRequestError } from "@booki/common";
import mongoose, { ObjectId } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

/**
 * reply schema
 * Storage for the books:-
 * Rating &
 * Reviews
 */

/**
 * the following interface
 * describes the attributes of a replay table or schema.
 */

interface IReply {
  id: ObjectId;
  userId: string;
  text: string;
  likes: string[];
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the Replay Schema,
 */

export interface ReplyDoc extends mongoose.Document {
  id: ObjectId;
  userId: string;
  text: string;
  likes: string[];
}

interface ReplyModel extends mongoose.Model<ReplyDoc> {
  build(attrs: IReply): ReplyDoc;
  update(attrs: IReply): ReplyDoc;
}

export const ReplySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    likes: [
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

ReplySchema.set("versionKey", "version");
ReplySchema.plugin(updateIfCurrentPlugin);

ReplySchema.statics.build = (attrs: IReply) => {
  return new Reply({
    _id: attrs.id,
    text: attrs.text,
    userId: attrs.userId,
  });
};

ReplySchema.statics.update = async function (attrs: IReply) {
  const reply = await this.findById(attrs.id);
  if (!reply) throw new BadRequestError("Comment not found");
  reply.likes = attrs.likes;
  return reply;
};

const Reply = mongoose.model<ReplyDoc, ReplyModel>("Reply", ReplySchema);

export { Reply };
