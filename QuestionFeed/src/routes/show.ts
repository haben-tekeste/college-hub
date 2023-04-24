import { NotFoundError } from "@hthub/common";
import express from "express";
import { Answer } from "../model/answer";
import { Question } from "../model/question";

const router = express.Router();

router.get("/api/questionfeed/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findById(questionId)
      .populate("author")
      .populate({
        path: "answers",
        populate: {
          path: "author",
        },
      });
    if (!question) throw new NotFoundError();

    res.status(200).json({ question });
  } catch (error) {
    next(error);
  }
});

export { router as showQuestionRouter };
