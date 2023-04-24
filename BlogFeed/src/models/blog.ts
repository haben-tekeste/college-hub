import mongoose, { ObjectId, Schema } from "mongoose";

// An interface that describes
// properties required to create a blog
interface IBlog {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  content: string;
  tags?: string[];
  summary: string;
  imgUrl: string;
  comments: ObjectId[];
}

// an interface that describes
// the properties of a blog model
interface IModel extends mongoose.Model<IDocument> {
  build(profile: IBlog): IDocument;
}

// an interface that describes the properties
// a blog document has
interface IDocument extends mongoose.Document {
  title: string;
  author: string;
  createdAt: Date;
  content: string;
  tags: string[];
  summary: string;
  likes: number;
  imgUrl: string;
  comments: ObjectId[];
}

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    tags: [String],
    likes: {
      type: Number,
      default: 0,
    },
    imgUrl: {
      type: String,
      default: "empty",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
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

blogSchema.statics.build = (blog: IBlog) => {
  return new Blog({
    _id: blog.id,
    title: blog.title,
    content: blog.content,
    createdAt: blog.createdAt,
    author: blog.author,
    likes: 0,
    tags: blog.tags,
    summary: blog.summary,
    imgUrl: blog.imgUrl,
  });
};

export const Blog = mongoose.model<IDocument, IModel>("Blog", blogSchema);
