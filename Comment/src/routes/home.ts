import express from "express";
import { Comment } from "../model/comment";

const router = express.Router();

router.get("/api/comments", async (req, res, next) => {
  try {
    // check if user is admin

    const comments = await Comment.find({});

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

export { router as getAllCommentsRouter };
