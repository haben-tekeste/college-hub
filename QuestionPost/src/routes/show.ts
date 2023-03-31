import { NotFoundError } from "@hthub/common";
import express from "express";
import { Question } from "../model/question";

const router = express.Router();

router.get("/api/questions/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findById(questionId);
    if (!question) throw new NotFoundError();
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
});

export { router as getQuestionRouter };
