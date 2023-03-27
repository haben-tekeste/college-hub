import express from "express";
import { body } from "express-validator";
import { NotAuthorizedError, validateRequest } from "@hthub/common";
import { Application } from "../models/application";
import { ApplicationStatus } from "../types/applicationStatus";

const router = express.Router();

router.put(
  "/api/applications/approve/:applicationId",
  async (req, res, next) => {
    try {
      const { applicationId } = req.params;
      const application = await Application.findById(applicationId).populate(
        "Project"
      );
      if (!application) throw new Error("Application not found");

      if (application.projectId.postedBy !== req.currentUser?.id)
        throw new NotAuthorizedError();

      if (new Date() > application.projectId.deadline)
        throw new Error("Project already expired");

      application.set({ status: ApplicationStatus.Approved });

      await application.save();

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export { router as updateApplicationRouter };