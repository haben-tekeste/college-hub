import express, { Request, Response, NextFunction } from "express";
import { NotAuthorizedError, validateRequest } from "@hthub/common";
import { body } from "express-validator";
import { Question } from "../model/question";

const router = express.Router();

router.put(
  "/api/questions/:questionId",
  [
    body("title").not().isEmpty().trim().escape(),
    body("content").not().isEmpty().trim().escape(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content } = req.body;
      const { questionId } = req.params;
      const question = await Question.findById(questionId);
      if (!question) throw new Error("Question not found");
      if (question.author.toString() !== req.currentUser?.id)
        throw new NotAuthorizedError();
      question.set({
        title,
        content,
      });
      await question.save();
      res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  }
);

export { router as updateQuestionRouter };
