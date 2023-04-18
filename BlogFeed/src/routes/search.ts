import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { elasticClient } from "../elastic-search";

const router = express.Router();

router.get(
  "/api/blogFeed/search",
  body("term").not().isEmpty(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { term } = req.body;
    try {
      const blogs = await elasticClient.fetchPosts(term, "Blogs");
      res.status(200).json(blogs);
    } catch (error) {
      next(error);
    }
  }
);

export { router as searchBlogRouter };
