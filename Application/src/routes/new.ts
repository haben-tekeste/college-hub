import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { NotFoundError, validateRequest } from "@hthub/common";
import mongoose from "mongoose";
import { Project } from "../models/project";
import { Application } from "../models/application";
import { ApplicationStatus } from "../types/applicationStatus";

const router = express.Router();

router.post(
  "/api/applications",
  [
    body("projectId")
      .not()
      .isEmpty()
      .escape()
      .custom((value) => {
        if (mongoose.Types.ObjectId.isValid(value)) throw new NotFoundError();
      }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.body;
    try {
      const project = await Project.findById(projectId);
      if (!project || new Date() > project.deadline) {
        throw new Error("Project not found or expired");
      }
      if (project.postedBy === req.currentUser?.id)
        throw new Error("You can apply to your own project");
      const id = req.currentUser?.id || "";
      const application = Application.build({
        projectId,
        status: ApplicationStatus.Pending,
        userId: id,
        createdAt: new Date(),
      });

      await application.save();

      res.status(201).json({ success: "true" });
    } catch (error) {
      next(error);
    }
  }
);

export { router as newApplicationRouter };
