import express from "express";
import { body } from "express-validator";
import { NotAuthorizedError } from "@hthub/common";
import { Answer } from "../model/answer";

const router = express.Router();

router.get("/api/answers/:answerId", async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");
    res.status(200).json(answer);
  } catch (error) {
    next(error);
  }
});

export { router as getAnswerRouter };
