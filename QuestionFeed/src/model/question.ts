import mongoose, { Schema } from "mongoose";

// An interface that describes
// properties required to create a question
interface IQuestion {
  id: string;
  author: string;
  title: string;
  content: string;
  createdAt: Date;
}

// an interface that describes
// the properties of a question model
interface IModel extends mongoose.Model<IDocument> {
  build(Question: IQuestion): IDocument;
}

// an interface that describes the properties
// a question document has
interface IDocument extends mongoose.Document {
  author: string;
  content: string;
  title: string;
  createdAt: Date;
  //   approval: string;
}

const QuestionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    // approval: {
    //   type: String,
    //   enum: ["Pending", "Approved", "Rejected"],
    //   default: "Pending",
    // },
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

QuestionSchema.statics.build = (question: IQuestion) => {
  return new Question({
    _id: question.id,
    title: question.title,
    author: question.author,
    createdAt: question.createdAt,
    content: question.content,
  });
};

export const Question = mongoose.model<IDocument, IModel>(
  "Question",
  QuestionSchema
);
