import express from "express";

const router = express.Router();

router.delete("/api/book-comment/:commentId");

export { router as deleteCommentRouter };
