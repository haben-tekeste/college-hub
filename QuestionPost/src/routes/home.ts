import express from "express";
import { Question } from "../model/question";

const router = express.Router();

router.get("/api/questions/myquestions", async (req, res, next) => {
  try {
    const questions = await Question.find({ author: req.currentUser?.id });
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});

export { router as myquestionsRouter };
