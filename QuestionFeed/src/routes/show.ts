import { NotFoundError } from "@hthub/common";
import express from "express";
import { Answer } from "../model/answer";
import { Question } from "../model/question";

const router = express.Router();

router.get("/api/questionfeed/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findById(questionId).populate("User");
    if (!question) throw new NotFoundError();
    const answers = await Answer.find({ questionId }).populate("User");
    res.status(200).json({ question, answers });
  } catch (error) {
    next(error);
  }
});
