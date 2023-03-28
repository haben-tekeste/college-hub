import express from "express";
import { Answer } from "../model/answer";

const router = express.Router();

router.post("/api/answers/downvote/:answerId", async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    if (req.currentUser?.id || "" in answer.downvotes.voters)
      throw new Error("You have alread downvoted the answer");
    if (req.currentUser?.id || "" in answer.upvotes.voters) {
      const ds = answer.upvotes.voters.filter(
        (ans) => ans === req.currentUser?.id
      );

      answer.set({
        upvotes: {
          quantity: answer.upvotes.quantity - 1,
          voters: ds,
        },
      });
    }
    answer.set({
      downvotes: {
        quantity: answer.downvotes.quantity + 1,
        voters: answer.downvotes.voters.push(req.currentUser?.id || ""),
      },
    });
    await answer.save();
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
});

export { router as downvoteAnswerRouter };
