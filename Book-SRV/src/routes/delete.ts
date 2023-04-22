import { BadRequestError, isAuth, NotAuthorizedError } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book";

const router = express.Router();

router.delete(
  "/api/booki/:bookId",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const book = await Book.findByIdAndDelete(bookId).populate("ownerId");
      if (!book) throw new BadRequestError("Sorry book not found");
      if (book.ownerId.toString() !== req.currentUser!.id)
        throw new NotAuthorizedError();

      await book.save();
      res.send(book);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as deleteBook };
