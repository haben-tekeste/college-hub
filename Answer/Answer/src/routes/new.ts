import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { NotAuthorizedError, validateRequest } from "@hthub/common";
import mongoose from "mongoose";
import { Answer } from "../model/answer";

const router = express.Router();

router.post(
  "/api/answers",
  [
    body("content").not().isEmpty().isAlphanumeric().escape(),
    body("questionId")
      .not()
      .isEmpty()
      .custom((value) => {
        if (mongoose.isValidObjectId(value))
          throw new Error("Invalid question");
      }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, questionId } = req.body;
      const answer = Answer.build({
        author: req.currentUser?.id!,
        content,
        questionId,
        createdAt: new Date(),
      });
      await answer.save();
      res.status(201).json(answer);
    } catch (error) {
      next(error);
    }
  }
);

export { router as newAnswerRouter };
