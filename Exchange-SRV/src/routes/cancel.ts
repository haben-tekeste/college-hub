import { BadRequestError, isAuth } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { ExchangeStatus } from "../../Subjects/subjects";
import { Bid } from "../models/bid";

const router = express.Router();

router.delete(
  "/api/bid/:bidId",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bidId } = req.params;
      const bid = await Bid.findById(bidId).populate("bidderBook");
      if (!bid) throw new BadRequestError("No bid found");

      bid.status = ExchangeStatus.CANCELLED;
      await bid.save();

      res.send(bid);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as cancel };
