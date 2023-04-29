import express from "express";
import { User } from "../models/user";
import { BadRequestError } from "@hthub/common";
import { Blog } from "../models/blog";

const router = express.Router();

router.get("/api/blogFeed/myblogs", async (req, res, next) => {
  try {
    // const user = await User.findById(req.currentUser?.id!);
    // if (!user?.interests.length)
    //   throw new BadRequestError("Please pick interests");
    // console.log("in");
    const blogs = await Blog.find(
      { author: req.currentUser?.id! },
      {},
      { sort: { likes: -1 } }
    );

    res.status(201).json(blogs);
  } catch (err) {
    console.log("err");
    next(err);
  }
});

export { router as myBlogsRouter };
