import express, { NextFunction, Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  validateRequest,
} from "@hthub/common";
import { Blog } from "../model/blog";
import { body } from "express-validator";

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
      if (!blogId) throw new NotFoundError();
      const blog = await Blog.findById(blogId);
      if (!blog) throw new NotFoundError();
      if (req.currentUser?.id !== blog.author) throw new NotAuthorizedError();

      // deletion or attribute change

      // blog updated event

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export { router as updateBlogRouter };
