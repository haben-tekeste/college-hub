import express, { NextFunction, Request, Response, text } from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Blog } from "../model/blog";
import { BlogCreatedPublisher } from "../events/publishers/blog-created-publisher";
import { natswrapper } from "../nats-wrapper";
import cohere from "cohere-ai";

const router = express.Router();

router.post(
  "/api/blogs",
  [
    body("title").not().isEmpty().isString().escape(),
    body("content").not().isEmpty().escape(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content } = req.body;

      const blog = await Blog.findOne({ title });
      if (blog) throw new Error("Blog with the same title already exists");

      const newBlog = Blog.build({
        title,
        content,
        createdAt: new Date(),
        author: req.currentUser?.id!,
      });
      // add summary
      cohere.init("d0jGPe4VOWNj3wrNSPwYEtRHxO27F8Q40NlQXHGF");
      const {
        body: { summary },
      } = await cohere.summarize({
        text: content,
      });

      newBlog.set({summary});

      // add tags

      // save
      await newBlog.save();

      // publish events
      new BlogCreatedPublisher(natswrapper.Client).publish({
        id: newBlog.id,
        title: newBlog.title,
        author: newBlog.author,
        createdAt: newBlog.createdAt.toISOString(),
        summary: newBlog.summary,
        likes: 0,
        tags: [],
        content: newBlog.content,
      });

      res.status(201).json(newBlog);
    } catch (error) {
      // console.log(error);

      next(error);
    }
  }
);

export { router as createBlogRouter };
