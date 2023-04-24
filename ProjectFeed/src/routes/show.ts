import { NotFoundError } from "@hthub/common";
import express from "express";
import { Project } from "../model/project";

const router = express.Router();

router.get("/api/projectfeed/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("postedBy");
    if (!project) throw new NotFoundError();
    res.status(200).json({ project });
  } catch (error) {
    next(error);
  }
});

export { router as showProjectRouter };
