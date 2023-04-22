import { isAuth } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { ExchangeStatus } from "../../Subjects/subjects";
import { Bid } from "../models/bid";

const router = express.Router();

router.get(
  "/api/bid/:bookId",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const bids = await Bid.find({
        bookId,
        status: { $in: [ExchangeStatus.PENDING] },
      }).populate("bidderBook");
      res.send(bids);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as getBids };
