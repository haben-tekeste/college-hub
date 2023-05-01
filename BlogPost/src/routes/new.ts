import express, { NextFunction, Request, Response, text } from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Blog } from "../model/blog";
import { BlogCreatedPublisher } from "../events/publishers/blog-created-publisher";
import { natswrapper } from "../nats-wrapper";
import cohere from "cohere-ai";
import axios from "axios";
import { multerUploads } from "../config/multerConfig";
import path from "path";
import dataUriParser from "datauri/parser";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post(
  "/api/blogs",
  multerUploads,
  [body("title").not().isEmpty(), body("content").not().isEmpty()],
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
      if (req.file) {
        const dParser = new dataUriParser();

        const content = dParser.format(
          path.extname(req.file.originalname).toString(),
          req.file.buffer
        ).content;

        const result = await cloudinary.v2.uploader.upload(content!, {
          public_id: uuidv4(),
        });
        newBlog.set({ imgUrl: result.secure_url });
      }

      // add summary
      cohere.init("d0jGPe4VOWNj3wrNSPwYEtRHxO27F8Q40NlQXHGF");
      const {
        body: { summary },
      } = await cohere.summarize({
        text: content,
      });

      newBlog.set({ summary });

      // add tags
      const { data } = await axios.post(
        "http://classification-srv:5000/predict",
        {
          text: title,
        }
      );
      newBlog.set({ tags: data[0] });
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
        tags: data[0],
        content: newBlog.content,
        imgUrl: newBlog.imgUrl,
      });

      res.status(201).json(newBlog);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
);

export { router as createBlogRouter };
