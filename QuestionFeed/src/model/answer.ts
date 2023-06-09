import mongoose, { Schema } from "mongoose";

// An interface that describes
// properties required to create a answer
interface IAnswer {
  id: string;
  author: string;
  content: string;
  questionId: string;
  createdAt: Date;
}

// an interface that describes
// the properties of a answer model
interface IModel extends mongoose.Model<IDocument> {
  build(answer: IAnswer): IDocument;
}

// an interface that describes the properties
// a answer document has
export interface IDocument extends mongoose.Document {
  author: string;
  content: string;
  questionId: string;
  createdAt: Date;
  upvotes: {
    quantity: number;
    voters: string[];
  };
  downvotes: {
    quantity: number;
    voters: string[];
  };
  approval: string;
}

const answerSchema = new mongoose.Schema(
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
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    approval: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    upvotes: {
      quantity: {
        type: Number,
        default: 0,
      },
      voters: [mongoose.Schema.Types.ObjectId],
    },
    downvotes: {
      quantity: {
        type: Number,
        default: 0,
      },
      voters: [mongoose.Schema.Types.ObjectId],
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

answerSchema.statics.build = (answer: IAnswer) => {
  return new Answer({
    _id: answer.id,
    ...answer,
  });
};

export const Answer = mongoose.model<IDocument, IModel>("Answer", answerSchema);
