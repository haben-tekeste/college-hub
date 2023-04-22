import express from "express";
import { Blog } from "../model/blog";
import { BadRequestError, NotFoundError } from "@hthub/common";
import { natswrapper } from "../nats-wrapper";
import { BlogLikedPublisher } from "../events/publishers/blog-liked-publisher";

const router = express.Router();

router.post("/api/blogs/like/:blogId", async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError();
    if (req.currentUser?.id! in blog.likedBy)
      throw new BadRequestError("Blog already liked");
    blog.likes++;
    blog.likedBy.push(req.currentUser?.id!);
    await blog.save();
    new BlogLikedPublisher(natswrapper.Client).publish({
      id: blog.id,
      author: blog.author,
    });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

export { router as blogLikeRouter };
