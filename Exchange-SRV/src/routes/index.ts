import { isAuth, validateRequest } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import mongoose, { ObjectId } from "mongoose";
import { ExchangeStatus } from "../../Subjects/subjects";
import { Bid } from "../models/bid";

const router = express.Router();

router.post(
  "/api/bid/",
  isAuth,
  [body("bookId"), body("bidderBook")],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId, bidderBook, comment } = req.body;
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
