import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { elasticClient } from "../elastic-search";

const router = express.Router();

router.post(
  "/api/questionfeed/search",
  body("term").not().isEmpty(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { term } = req.body;
    try {
      const questions = await elasticClient.fetchPosts(term, "Questions");
      res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  }
);

export { router as searchQuestionRouter };
