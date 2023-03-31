import { validateRequest } from "@hthub/common";
import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { Question } from "../model/question";

const router = express.Router();

router.post(
  "/api/questions",
  [
    body("title").not().isEmpty().trim().escape(),
    body("content").not().isEmpty().trim().escape(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content } = req.body;
      const question = await Question.find({ title });
      if (question) throw new Error("Question with same title already exist");
      const newQuestion = Question.build({
        title,
        content,
        author: req.currentUser?.id!,
        createdAt: new Date(),
      });
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  }
);

export { router as createQuestionRouter };
