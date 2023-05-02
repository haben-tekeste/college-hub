import { BadRequestError, isAuth, NotAuthorizedError } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { ExchangeStatus } from "../../Subjects/subjects";
import { Bid } from "../models/bid";
import { Book } from "../models/book";
import { QBookUpdatedPublisher } from "../events/publisher/bookUpdatedPublisher";
import { nats } from "../NatsWrapper";

const router = express.Router();

router.put(
  "/api/bid/:bidId",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bidId } = req.params;
      const bid = await Bid.findById(bidId).populate("bidderBook");
      if (!bid) throw new BadRequestError("No bid found");
      const bookId = bid.bookId;
      const book = await Book.findById(bookId);

      if (!book) throw new BadRequestError("Sorry book not found");

      if (book.ownerId.toString() !== req.currentUser!.id)
        throw new NotAuthorizedError();

      const bids = await Bid.find({
        bookId,
        status: { $in: [ExchangeStatus.PENDING] },
      });

      bids.map(async (bid) => {
        if (bid._id.toString() !== bidId) {
          bid.status = ExchangeStatus.REJECTED;
        } else {
          bid.status = ExchangeStatus.ACCEPTED;
        }
        await bid.save();
        return bid;
      });

      await new QBookUpdatedPublisher(nats.client).publish({
        id: book.id,
        ownerId: book.ownerId,
        title: book.title,
        author: book.author,
        description: book.description,
        publishedDate: book.publishedDate,
        comments: [],
        cloudinaryPublicId: book.cloudinaryPublicId,
        genre: book.genre,
        coverImage: book.coverImageUrl,
        likes: [],
        condition: book.condition,
        show: false,
      });

      await new QBookUpdatedPublisher(nats.client).publish({
        id: bid.bidderBook._id,
        ownerId: book.ownerId,
        title: book.title,
        author: book.author,
        description: book.description,
        publishedDate: book.publishedDate,
        comments: [],
        cloudinaryPublicId: book.cloudinaryPublicId,
        genre: book.genre,
        coverImage: book.coverImageUrl,
        likes: [],
        condition: book.condition,
        show: false,
      });

      res.send({ bid, bids });
    } catch (error) {
      return next(error);
    }
  }
);

export { router as approve };
