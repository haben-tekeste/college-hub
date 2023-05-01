import { BadRequestError, isAuth, NotAuthorizedError } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book";
const router = express.Router();

router.get(
  "/api/query/:bookId",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const book = await Book.findById(bookId)
        .populate("ownerId")
        .populate({
          path: "comments",
          populate: {
            path: "reply",
          },
        });
      if (!book) throw new BadRequestError("Sorry but no books found");

      const recommendedBooks = await Book.find({
        genre: { $in: [...book.genre] },
        ownerId: { $ne: req.currentUser!.id },
        _id: { $ne: bookId },
      })
        .sort({ publishedDate: -1 })
        .limit(7)
        .populate("ownerId")
        .populate({
          path: "comments",
          populate: {
            path: "reply",
          },
        });

      const result = {
        book,
        recommendedBooks,
        x: "hi",
      };
      res.send(result);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as getBook };
