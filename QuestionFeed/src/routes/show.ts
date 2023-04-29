import { NotFoundError } from "@hthub/common";
import express from "express";
import { Answer } from "../model/answer";
import { Question } from "../model/question";
import { client } from "../config/ai-answer";
import { openai } from "../config/openai";

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

    const {
      data: { choices },
    } = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      prompt: `${question.title}`,
    });

    res.status(200).json({ question, answer: choices[0].text });
  } catch (error) {
    next(error);
  }
});

export { router as showQuestionRouter };
