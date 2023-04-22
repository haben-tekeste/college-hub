import mongoose, { ObjectId } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

/**
 * Books schema
 * Storage for the books details:-
 */

/**
 * interface for the exchange request
 * this one is used int IBook interface for the exchangeRequest attribute
 */

/**
 * the following interface
 * describes the attributes found on the Book schema or tabl
 */

interface IBook {
  id: ObjectId;
  title: string;
  author: string;
  description: string;
  genre: string;
  coverImageUrl: string;
  publishedDate: Date;
  ownerId: ObjectId;
  condition: string;
}

/**
 * extending the mongoose doc for the sake
 * of adding the attributes of the Book Schema,
 */

export interface BookDoc extends mongoose.Document {
  id: ObjectId;
  title: string;
  author: string;
  description: string;
  genre: string;
  coverImageUrl: string;
  publishedDate: Date;
  ownerId: ObjectId;
  condition: string;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: IBook): BookDoc;
}

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      default: "test",
    },
    publishedDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    condition: {
      type: String,
      required: true,
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

BookSchema.set("versionKey", "version");
BookSchema.plugin(updateIfCurrentPlugin);

BookSchema.statics.build = (attrs: IBook) => {
  return new Book({
    _id: attrs.id,
    title: attrs.title,
    author: attrs.author,
    description: attrs.description,
    genre: attrs.genre,
    coverImageUrl: attrs.coverImageUrl,
    publishedDate: attrs.publishedDate,
    ownerId: attrs.ownerId,
    condition: attrs.condition,
  });
};

/**
 * Building the Book model
 */

const Book = mongoose.model<BookDoc, BookModel>("Book", BookSchema);

// exporting the Book model
export { Book };
