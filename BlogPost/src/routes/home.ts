import express from "express";
import { Blog } from "../model/blog";

const router = express.Router();

router.get("/api/blogs", async (req, res, next) => {
  try {
    const blogs = await Blog.find({ author: req.currentUser?.id });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

export { router as getAllBlogsRouter };
