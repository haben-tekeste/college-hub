import mongoose, { Schema } from "mongoose";

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
  });
};

export const Blog = mongoose.model<IDocument, IModel>("Blog", blogSchema);
