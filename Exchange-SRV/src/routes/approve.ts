import { BadRequestError, isAuth } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { ExchangeStatus } from "../../Subjects/subjects";
import { Bid } from "../models/bid";

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

      const bids = await Bid.find({
        bookId: bookId,
        Status: { $in: [ExchangeStatus.PENDING] },
      });

      bid.status = ExchangeStatus.ACCEPTED;

      await bid.save();

      bids.map(async (bid) => {
        if (bid._id !== bidId) {
          bid.status = ExchangeStatus.REJECTED;
          await bid.save();
          return bid;
        }
        await bid.save();
        return bid;
      });

      res.send({ bid, bids });
    } catch (error) {
      return next(error);
    }
  }
);

export { router as approve };
