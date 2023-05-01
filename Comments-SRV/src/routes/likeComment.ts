import { BadRequestError, isAuth, validateRequest } from "@booki/common";
import express, { NextFunction, Request, Response, text } from "express";
import { body } from "express-validator";
import { CommentUpdatedPublisher } from "../events/publisher/commentUpdatedPublisher";
import { Comment } from "../models/comment";
import { nats } from "../NatsWrapper";

const router = express.Router();

router.put(
  "/api/book-comment/likeComment",
  [body("commentId").not().isEmpty().withMessage("No comment provided")],
  validateRequest,
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.body;
      const comment = await Comment.findById(commentId);
      if (!comment) throw new BadRequestError("Comment not found");

      const userExists: string | undefined = comment.likes.find(
        (id) => id === req.currentUser!.id
      );

      if (!userExists) {
        console.log("====> here");
        comment.likes.push(req.currentUser!.id);
      } else {
        comment.likes = comment.likes.filter(
          (id) => id !== req.currentUser!.id
        );
      }
      await comment.save();
      new CommentUpdatedPublisher(nats.client).publish({
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

export { router as likeComment };
