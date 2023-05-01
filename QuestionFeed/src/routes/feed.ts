import express from "express";
import { Question } from "../model/question";

const router = express.Router();

router.get("/api/questionfeed", async (req, res, next) => {
  try {
    const questions = await Question.find({}, {}, { sort: { createdAt: -1 } })
      .populate("author")
      .populate({
        path: "answers",
        populate: {
          path: "author",
        },
      });
    res.status(201).json(questions);
  } catch (error) {
    next(error);
  }
});

export { router as questionFeedRouter };
