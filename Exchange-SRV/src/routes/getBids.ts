import { BadRequestError, isAuth, NotAuthorizedError } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { ExchangeStatus } from "../../Subjects/subjects";
import { Bid } from "../models/bid";
import { Book } from "../models/book";

const router = express.Router();

router.get(
  "/api/bid/:bookId",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const book = await Book.findById(bookId);
      if (!book) throw new BadRequestError("Sorry book not found");

      if (book.ownerId.toString() !== req.currentUser!.id)
        throw new NotAuthorizedError();
      const bids = await Bid.find({
        bookId,
        status: { $in: [ExchangeStatus.PENDING] },
      })
        .populate("bidderBook")
        .populate("bidder");
      res.send(bids);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as getBids };
