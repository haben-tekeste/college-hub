import express from "express";

const router = express.Router();

router.get("/api/questionfeed");

export { router as questionFeedRouter };
