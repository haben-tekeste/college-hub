import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import {
  NotAuthorizedError,
  NotFoundError,
  validateRequest,
} from "@hthub/common";
import { Comment } from "../model/comment";
import { natswrapper } from "../nats-wrapper";
import { CommentUpdatedPublisher } from "../events/publishers/comment-updated-publisher";

const router = express.Router();

router.put(
  "/api/comments/:commentId",
  [
    body("content")
      .isLength({ min: 1, max: 1000 })
      .escape()
      .withMessage("comment is either too short or too long"),
    body("parentId")
      .not()
      .isEmpty()
      .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value))
          throw new Error("Invalid ID");
        return true;
      }),
    body("blogId")
      .not()
      .isEmpty()
      .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value))
          throw new Error("Invalid ID");
        return true;
      }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content } = req.body;
      const { commentId } = req.params;
      const comment = await Comment.findById(commentId);
      if (!comment) throw new NotFoundError();
      if (comment.author.toString() !== req.currentUser?.id)
        throw new NotAuthorizedError();
      comment.set({
        content,
        updatedAt: new Date(),
        approval: "Pending",
      });
      await comment.save();

      // publish event
      new CommentUpdatedPublisher(natswrapper.Client).publish({
        id: comment.id,
        content: comment.content,
        status: "Pending",
      });
      res.status(201).json(comment);
    } catch (error) {}
  }
);

export { router as updateCommentRouter };
