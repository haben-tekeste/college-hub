import express from "express";
import { Comment } from "../model/comment";
import { BadRequestError, NotFoundError } from "@hthub/common";
import { natswrapper } from "../nats-wrapper";
import { CommentLikedPublisher } from "../events/publishers/comment-liked-publisher";

const router = express.Router();

router.put("/api/book-comment/like/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) throw new NotFoundError();

    if (req.currentUser?.id! in comment.likedBy)
      throw new BadRequestError("You have already liked the comment");

    comment.likes++;
    comment.likedBy.push(req.currentUser?.id!);

    await comment.save();

    new CommentLikedPublisher(natswrapper.Client).publish({
      id: comment.id,
      author: comment.author,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

export { router as commentLikeRouter };
