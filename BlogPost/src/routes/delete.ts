import express from "express";
import { NotAuthorizedError, NotFoundError } from "../../../Common/src";
import { Blog } from "../model/blog";

const router = express.Router();

router.delete("/api/blogs/:blogId", async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) throw new NotFoundError();
    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError();
    if (req.currentUser?.id !== blog.author) throw new NotAuthorizedError();

    // deletion or attribute change

    // blog deleted event

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

export { router as deleteBlogRouter };
