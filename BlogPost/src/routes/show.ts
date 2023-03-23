import express from "express";
import { NotFoundError } from "@hthub/common";
import { Blog } from "../model/blog";

const router = express.Router();

router.get("/api/blogs/:blogId", async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) throw new NotFoundError();

    const blog = await Blog.findById(blogId);

    if (!blog) throw new NotFoundError();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

export { router as getBlogRouter };
