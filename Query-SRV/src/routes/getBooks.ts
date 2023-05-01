import { BadRequestError, isAuth, NotAuthorizedError } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book";
import { User } from "../models/user";
const router = express.Router();

router.get(
  "/api/query/home",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.currentUser!.id);

      if (!user) throw new NotAuthorizedError();

      const intersts = user.interests.length ? user.interests : null;

      const books = await Book.find({
        ownerId: { $ne: req.currentUser!.id },
        show: true,
      })
        .populate("ownerId")
        .populate("comments")
        .populate("comments.reply");
      if (!books) throw new BadRequestError("Sorry but no books found");

      const latestCreatedAt = await Book.find(
        {},
        {},
        { sort: { createdAt: -1 }, limit: 7 }
      )
        .populate("ownerId")
        .populate("comments")
        .populate("comments.reply");

      const latestPublishedDate = await Book.find(
        {},
        {},
        { sort: { publishedDate: -1 }, limit: 7 }
      )
        .populate("ownerId")
        .populate("comments")
        .populate("comments.reply");
      const popular = await Book.find({}, {}, { sort: { likes: -1 }, limit: 7 })
        .populate("ownerId")
        .populate("comments")
        .populate("comments.reply");
      const result = {
        books,
        latestCreatedAt,
        latestPublishedDate,
        popular,
      };
      res.send(result);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as bookiHome };
