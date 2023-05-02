import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { NotAuthorizedError, validateRequest } from "@hthub/common";
import mongoose from "mongoose";
import { Answer } from "../model/answer";
import { AnswerCreatedPublisher } from "../events/publishers/answer-created-publisher";
import { natswrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/answers",
  [
    body("content").not().isEmpty().withMessage("Answer should not be empty"),
    body("questionId")
      .not()
      .isEmpty()
      .custom((value) => {
        if (!mongoose.isValidObjectId(value))
          throw new Error("Invalid question id");
        return true;
      }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, questionId } = req.body;
      console.log(content, questionId);
      const answer = Answer.build({
        author: req.currentUser?.id!,
        content,
        questionId,
        createdAt: new Date(),
      });
      await answer.save();
      // new AnswerCreatedPublisher(natswrapper.Client).publish({
      //   id: answer.id,
      //   author: answer.author,
      //   content: answer.content,
      //   questionId:answer.questionId,
      //   createdAt: answer.createdAt.toISOString()
      // })
      res.status(201).json(answer);
    } catch (error) {
      next(error);
    }
  }
);

export { router as newAnswerRouter };
