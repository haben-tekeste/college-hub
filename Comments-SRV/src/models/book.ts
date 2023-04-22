import mongoose, { ObjectId } from "mongoose";

export interface IBook {
  id: ObjectId;
}

interface BookDoc extends mongoose.Document {
  id: ObjectId;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: IBook): BookDoc;
}

const bookSchema = new mongoose.Schema(
  {},
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

bookSchema.statics.build = (attrs: IBook) => {
  return new Book({
    _id: attrs.id,
  });
};

const Book = mongoose.model<BookDoc, BookModel>("Book", bookSchema);

export { Book };
