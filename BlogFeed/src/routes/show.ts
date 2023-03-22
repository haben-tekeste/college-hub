import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/api/blogFeed/:blogId");

export { router as getBlogRouter };
