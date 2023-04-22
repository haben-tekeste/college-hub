import {
  BadRequestError,
  isAuth,
  NotFoundError,
  validateRequest,
} from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { ReplyCreatedPublisher } from "../events/publisher/replyCreatedPublisher";
import { Comment } from "../models/comment";
import { Reply } from "../models/reply";
import { nats } from "../NatsWrapper";

const router = express.Router();

router.put(
  "/api/book-comment/replay",
  [body("text").not().isEmpty(), body("commentId").not().isEmpty()],
  isAuth,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text, commentId } = req.body;
      if (!mongoose.isValidObjectId(commentId))
        throw new BadRequestError("Invalid commment Id");
      const comment = await Comment.findById(commentId);
      if (!comment) throw new BadRequestError("No comment found");
      const newReply = Reply.build({
        text: text,
        userId: req.currentUser!.id.toString(),
      });

      comment.reply = [...comment.reply, newReply];

      await comment.save();
      await newReply.save();
      new ReplyCreatedPublisher(nats.client).publish({
        id: newReply.id,
        userId: newReply.userId,
        text: newReply.text,
        commentId: comment.id,
        likes: 0,
      });
      res.send(newReply);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as replay };
