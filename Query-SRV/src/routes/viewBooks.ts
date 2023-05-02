import { BadRequestError, isAuth } from "@booki/common";
import express, { Request, Response } from "express";
import { Book } from "../models/book";
const router = express.Router();

router.get(
  "/api/query/view-my-books",
  isAuth,
  async (req: Request, res: Response) => {
    const books = await Book.find({
      ownerId: req.currentUser?.id,
      show: true,
    })
      .populate("ownerId")
      .populate("comments")
      .populate("comments.reply");

    if (!books) throw new BadRequestError("Sorry but no books found");
    res.send(books);
  }
);

export { router as ViewBooks };
