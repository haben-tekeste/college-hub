import { BadRequestError, isAuth, validateRequest } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { CommentCreatedPublisher } from "../events/publisher/commentCreatedPublisher";
import { Book } from "../models/book";
import { Comment } from "../models/comment";
import { nats } from "../NatsWrapper";

const router = express.Router();

router.post(
  "/api/comment/new",
  [
    body("text").not().isEmpty().withMessage("Comment must have a valid text"),
    body("bookId").not().isEmpty().withMessage("Invalid request"),
  ],
  isAuth,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text, bookId } = req.body;
      if (!mongoose.isValidObjectId(bookId))
        throw new BadRequestError("Not a valid book id");
      const book = await Book.findById(bookId);
      if (!book) throw new BadRequestError("No Book found to comment");
      const comment = Comment.build({
        bookId: bookId,
        userId: req.currentUser!.id,
        text: text,
        reply: [],
        likes: [],
      });

      await comment.save();
      new CommentCreatedPublisher(nats.client).publish({
        id: comment.id,
        text: comment.text,
        bookId: comment.bookId,
        likes: comment.likes,
        userId: comment.userId,
      });
      res.send(comment);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as newComment };
