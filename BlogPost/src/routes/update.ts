import express, { NextFunction, Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  validateRequest,
} from "@hthub/common";
import { Blog } from "../model/blog";
import { body } from "express-validator";
import { BlogUpdatedPublisher } from "../events/publishers/blog-updated-publisher";
import { natswrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/blogs/:blogId",
  [
    body("title").not().isEmpty().isString().escape(),
    body("content").not().isEmpty().escape(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogId } = req.params;
      const { title, content } = req.body;
      if (!blogId) throw new NotFoundError();
      const blog = await Blog.findById(blogId);
      if (!blog) throw new NotFoundError();
      if (req.currentUser?.id !== blog.author) throw new NotAuthorizedError();
      blog.set(title);
      blog.set(content);

      await blog.save();

      // blog updated event
      new BlogUpdatedPublisher(natswrapper.Client).publish({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        createdAt: blog.createdAt.toISOString(),
        summary: blog.summary,
        likes: 0,
        tags: [],
        content: blog.content,
      });

      res.status(200).json(blog);
    } catch (error) {
      next(error);
    }
  }
);

export { router as updateBlogRouter };
