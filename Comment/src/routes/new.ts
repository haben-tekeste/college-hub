import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { validateRequest, NotFoundError } from "@hthub/common";
import { Comment } from "../model/comment";
import { CommentCreatedPublisher } from "../events/publishers/comment-created-publisher";
import { natswrapper } from "../nats-wrapper";

const router = express.Router();


router.post(
  "/api/comments",
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
      }),
    body("blogId")
      .not()
      .isEmpty()
      .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value))
          throw new Error("Invalid ID");
      }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, parentId, blogId } = req.body;

      const comment = Comment.build({
        content,
        parentId,
        blogId,
        author: req.currentUser?.id || "",
        createdAt: new Date(),
      });
      await comment.save();

      // publish event to be moderated
      new CommentCreatedPublisher(natswrapper.Client).publish({
        id: comment.id,
        content: comment.content,
        status:"Pending"
      })
    } catch (error) {
      next(error);
    }
  }
);

export { router as createCommentRouter };
