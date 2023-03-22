import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/api/blogFeed/search");

export { router as searchBlogRouter };
