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
      const books = await Book.findById(bookId)
        .populate("ownerId")
        .populate({
          path: "comments",
          populate: {
            path: "reply",
          },
        });

      if (!books) throw new BadRequestError("Sorry but no books found");
      res.send(books);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as getBook };
