import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Blog } from "../model/blog";
// import summaryTool from "node-summary";

const router = express.Router();

// title, author, createdAt, content
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

      const blog = await Blog.find({ title });
      if (blog) throw new Error("Blog with the same title already exists");

      const newBlog = Blog.build({
        title,
        content,
        createdAt: new Date(),
        author: req.currentUser?.id || "",
      });

      // add summary
      // let txtsummary;
      // summaryTool.summarize(title, content, (err, summary) => {
      //   if (err) throw new Error("Something went wrong");
      //   txtsummary = summary;
      // });

      // if (txtsummary) newBlog.set({summary: txtsummary})

      // add tags

      // save
      await newBlog.save();

      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export { router as createBlogRouter };
