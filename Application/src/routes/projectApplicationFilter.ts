import express from "express";
import { body } from "express-validator";
import { NotAuthorizedError, validateRequest } from "@hthub/common";
import { Application } from "../models/application";
import { Project } from "../models/project";

const router = express.Router();

router.get("/api/applications/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId)
    if (!project) throw new Error("Project not found")
    if (project.postedBy !== req.currentUser?.id) throw new NotAuthorizedError()
    const applications = await Application.find({ projectId }).populate({
      path: "projectId",
      match: {
        postedBy: req.currentUser?.id,
      },
    });
    if (!applications) throw new Error("No Applications found");
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
});

export { router as getProjectApplicationsRouter };
