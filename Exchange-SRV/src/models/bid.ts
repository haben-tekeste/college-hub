import mongoose, { ObjectId } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ExchangeStatus } from "../../Subjects/subjects";
import { BookDoc } from "./book";

interface IBid {
  bookId: BookDoc;
  bidder: string;
  status: ExchangeStatus;
  bidderBook: BookDoc;
  comment: string | undefined;
}

export interface BidDoc extends mongoose.Document {
  bookId: BookDoc;
  bidder: string;
  status: ExchangeStatus;
  bidderBook: BookDoc;
  comment: string | undefined;
}

interface BidModel extends mongoose.Model<BidDoc> {
  build(attrs: IBid): BidDoc;
}

const bidSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    bidder: {
      type: String,
      ref: "User",
      required: true,
    },
    bidderBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    comment: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ExchangeStatus),
      default: ExchangeStatus.PENDING,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

bidSchema.set("versionKey", "version");
bidSchema.plugin(updateIfCurrentPlugin);

bidSchema.statics.build = (attrs: BidDoc) => {
  return new Bid({
    bookId: attrs.bookId,
    bidder: attrs.bidder,
    bidderBook: attrs.bidderBook,
    comment: attrs.comment,
  });
};

export const Bid = mongoose.model<BidDoc, BidModel>("Bid", bidSchema);
