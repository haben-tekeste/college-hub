import express from "express";
import { NotFoundError } from "@hthub/common";
import { Comment } from "../model/comment";

const router = express.Router();

router.get("/api/book-comment/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) throw new NotFoundError();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

export { router as getCommentRouter };
