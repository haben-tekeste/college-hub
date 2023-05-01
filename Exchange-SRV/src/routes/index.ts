import { BadRequestError, isAuth, validateRequest } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ExchangeStatus } from "../../Subjects/subjects";
import { Bid } from "../models/bid";
import { Book } from "../models/book";

const router = express.Router();

router.post(
  "/api/bid/",
  isAuth,
  [body("bookId"), body("bidderBook")],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId, bidderBook, comment } = req.body;
      const book = await Book.findById(bookId);
      if (!book) throw new BadRequestError("Sorry book not found");
      book.ownerId;
      if (book.ownerId.toString() === req.currentUser!.id)
        throw new BadRequestError(
          "Sorry you are not allowed to bid as you're the owner"
        );
      const bidderBookExist = await Book.findById(bidderBook);
      if (!bidderBookExist) throw new BadRequestError("Sorry book not found");

      const bidExist = await Bid.find({
        bidderBook,
        bidder: req.currentUser!.id,
      });

      if (bidExist.length) {
        throw new BadRequestError(
          "Sorry but you've already bidded with this book"
        );
      }
      const bid = Bid.build({
        bookId: bookId,
        bidderBook: bidderBook,
        comment: comment,
        bidder: req.currentUser!.id,
        status: ExchangeStatus.PENDING,
      });

      await bid.save();

      res.send(bid);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as newBid };
