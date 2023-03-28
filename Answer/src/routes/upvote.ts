import express from "express";
import { Answer } from "../model/answer";

const router = express.Router();

router.post("/api/answers/upvote/:answerId", async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    if (req.currentUser?.id || "" in answer.upvotes.voters)
      throw new Error("You have alread upvoted the answer");
    if (req.currentUser?.id || "" in answer.downvotes.voters) {
      // answer.downvotes.voters.
      const ds = answer.downvotes.voters.filter(
        (ans) => ans === req.currentUser?.id
      );

      answer.set({
        downvotes: {
          quantity: answer.downvotes.quantity - 1,
          voters: ds,
        },
      });
    }
    answer.set({
      upvotes: {
        quantity: answer.upvotes.quantity + 1,
        voters: answer.upvotes.voters.push(req.currentUser?.id || ""),
      },
    });
    await answer.save();
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
});

export { router as upvoteAnswerRouter };
