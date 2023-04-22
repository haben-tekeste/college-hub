import { BadRequestError, isAuth, NotAuthorizedError } from "@booki/common";
import express, { Request, Response } from "express";
import { Book } from "../models/book";
import { User } from "../models/user";
const router = express.Router();

router.get("/api/query/home", isAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser!.id);

  if (!user) throw new NotAuthorizedError();

  const intersts = user.interests.length ? user.interests : null;

  const books = await Book.find({ genre: { $in: intersts } })
    .populate("ownerId")
    .populate("comments")
    .populate("comments.reply");

  if (!books) throw new BadRequestError("Sorry but no books found");
  res.send(books);
});

export { router as bookiHome };
