import express from "express";
import { NotFoundError } from "@hthub/common";
import { Blog } from "../models/blog";
import { Comment } from "../models/comment";

const router = express.Router();

router.get("/api/blogFeed/:blogId", async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) throw new NotFoundError();

    const blog = await Blog.findById(blogId)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      });
    if (!blog) throw new NotFoundError();
    res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
});

export { router as getBlogRouter };
