import express, { Request, Response, NextFunction } from "express";
import { Answer } from "../model/answer";
import { AnswerUpvotedPublisher } from "../events/publishers/answer-upvoted-publisher";
import { natswrapper } from "../nats-wrapper";
import { BadRequestError } from "@hthub/common";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/api/answers/upvote/:answerId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answerId } = req.params;
      const answer = await Answer.findById(answerId);
      if (!answer) throw new Error("Answer not found");

      if (answer.author.toString() === req.currentUser?.id)
        throw new BadRequestError("You can not upvote your answer");

      answer.upvotes.voters.forEach((voter) => {
        if (voter.toString() === req.currentUser?.id!)
          throw new BadRequestError("You have alread upvoted the answer");
      });

      //
      const userDownvotedPrev = answer.downvotes.voters.findIndex(
        (voter) => voter.toString() === req.currentUser?.id!
      );

      if (userDownvotedPrev != -1) {
        answer.downvotes.quantity--;
        answer.downvotes.voters.splice(userDownvotedPrev, 1);
      }

      answer.upvotes.quantity++;
      answer.upvotes.voters.push(req.currentUser?.id!);

      await answer.save();
      new AnswerUpvotedPublisher(natswrapper.Client).publish({
        id: answer.id,
        Voter: req.currentUser?.id!,
      });
      res.status(201).json(answer);
    } catch (error) {
      next(error);
    }
  }
);

export { router as upvoteAnswerRouter };
