import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { NotFoundError, validateRequest } from "@hthub/common";
import mongoose, { mongo } from "mongoose";
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
      .withMessage("Provide project id")
      .custom((value) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) throw new Error("Project not found");
        return true;
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

      if (project.postedBy == req.currentUser?.id)
        throw new Error("You can't apply to your own project");
      const existingApplication = await Application.findOne({
        projectId,
        userId: req.currentUser?.id,
      });
      console.log(existingApplication);
      
      if (existingApplication)
        throw new Error("You have already applied to this project");
      const application = Application.build({
        projectId,
        status: ApplicationStatus.Pending,
        userId: req.currentUser?.id!,
        createdAt: new Date(),
      });

      await application.save();

      res.status(201).json(application);
    } catch (error) {
      next(error);
    }
  }
);

export { router as newApplicationRouter };
