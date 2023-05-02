import express from "express";
import { Answer } from "../model/answer";
import { AnswerDownvotedPublisher } from "../events/publishers/answer-downvoted-publisher";
import { natswrapper } from "../nats-wrapper";
import { BadRequestError } from "@hthub/common";

const router = express.Router();

router.post("/api/answers/downvote/:answerId", async (req, res, next) => {
  try {
    const { answerId } = req.params;

    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    if (answer.author.toString() === req.currentUser?.id)
      throw new BadRequestError("You can not vote on your answer");

    answer.downvotes.voters.forEach((voter) => {
      if (voter.toString() === req.currentUser?.id!)
        throw new BadRequestError("You have already downvoted the answer");
    });

    //
    const userUpvotedPrev = answer.upvotes.voters.findIndex(
      (voter) => voter.toString() === req.currentUser?.id!
    );

    if (userUpvotedPrev != -1) {
      answer.upvotes.quantity--;
      answer.upvotes.voters.splice(userUpvotedPrev, 1);
    }

    answer.downvotes.quantity++;
    answer.downvotes.voters.push(req.currentUser?.id!);

    await answer.save();
    new AnswerDownvotedPublisher(natswrapper.Client).publish({
      id: answer.id,
      Voter: req.currentUser?.id!,
    });
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
});

export { router as downvoteAnswerRouter };
