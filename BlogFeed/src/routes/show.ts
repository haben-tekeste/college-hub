import express from "express";
import { NotFoundError } from "@hthub/common";
import { Blog } from "../models/blog";
import { Comment } from "../models/comment";

const router = express.Router();

router.get("/api/blogFeed/:blogId", async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) throw new NotFoundError();

    const blog = await Blog.findById(blogId).populate("author");
    if (!blog) throw new NotFoundError();
    const comments = await Comment.find({ blogId }).populate("author");
    res.status(200).json({ blog, comments });
  } catch (error) {
    next(error);
  }
});

export { router as getBlogRouter };
