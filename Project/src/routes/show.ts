import { Project } from "../model/project";
import express from "express";
import { NotFoundError } from "../../../Common/src";

const router = express.Router();

router.get("/api/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) throw new NotFoundError();

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

export { router as getProjectRouter };
