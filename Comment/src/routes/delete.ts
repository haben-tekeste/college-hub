import express from "express";

const router = express.Router();

router.delete("/api/comments/:commentId");

export { router as deleteCommentRouter };
