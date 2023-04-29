import express from "express";
import { User } from "../models/user";
import { BadRequestError } from "@hthub/common";
import { Blog } from "../models/blog";

const router = express.Router();

router.get("/api/blogFeed/", async (req, res, next) => {
  try {
    // const user = await User.findById(req.currentUser?.id!);
    // if (!user?.interests.length)
    //   throw new BadRequestError("Please pick interests");
    const blogs = await Blog.find({}, {}, { sort: { likes: -1 } }).populate(
      "author"
    );
    res.status(201).json(blogs);
  } catch (err) {
    next(err);
  }
});

export { router as getBlogFeedRouter };
