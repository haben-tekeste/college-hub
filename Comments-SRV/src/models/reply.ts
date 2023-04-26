import mongoose from "mongoose";
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
  userId: string;
  text: string;
  likes: string[];
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the Replay Schema,
 */

export interface ReplyDoc extends mongoose.Document {
  userId: string;
  text: string;
  likes: string[];
}

interface ReplyModel extends mongoose.Model<ReplyDoc> {
  build(attrs: IReply): ReplyDoc;
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

ReplySchema.statics.build = (attrs: IReply) => {
  return new Reply({
    text: attrs.text,
    userId: attrs.userId,
  });
};

const Reply = mongoose.model<ReplyDoc, ReplyModel>("Reply", ReplySchema);

export { Reply };
