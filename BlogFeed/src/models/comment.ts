import mongoose, { Schema } from "mongoose";

// An interface that describes
// properties required to create a comment
interface IComment {
  author: string;
  content: string;
  parentId: string;
  blogId: string;
  createdAt: Date;
}

// an interface that describes
// the properties of a comment model
interface IModel extends mongoose.Model<IDocument> {
  build(comment: IComment): IDocument;
}

// an interface that describes the properties
// a comment document has
interface IDocument extends mongoose.Document {
  author: string;
  content: string;
  parentId: string;
  blogId: string;
  createdAt: Date;
  likes: number;
  updatedAt: Date;
  approval: string;
}

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      requried: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    updatedAt: {
      type: mongoose.Schema.Types.Date,
    },
    approval: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
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

commentSchema.statics.build = (comment: IComment) => {
  return new Comment(comment);
};

export const Comment = mongoose.model<IDocument, IModel>(
  "Comment",
  commentSchema
);
