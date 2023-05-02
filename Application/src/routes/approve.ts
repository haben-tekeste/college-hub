import express from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  validateRequest,
  NotFoundError,
} from "@hthub/common";
import { Application } from "../models/application";
import { ApplicationStatus } from "../types/applicationStatus";
import { ApplicationApprovedPublisher } from "../events/publishers/application-approved-publisher";
import { natswrapper } from "../nats-wrapper";
import { User } from "../models/user";

const router = express.Router();

router.put(
  "/api/applications/approve/:applicationId",
  async (req, res, next) => {
    try {
      const { applicationId } = req.params;
      const application = await Application.findById(applicationId).populate(
        "projectId"
      );

      if (!application) throw new Error("Application not found");

      if (application.projectId.postedBy.toString() !== req.currentUser?.id)
        throw new NotAuthorizedError();

      if (new Date() > application.projectId.deadline)
        throw new Error("Project already expired");

      application.set({ status: ApplicationStatus.Approved });

      await application.save();

      const user = await User.findById(application.userId);

      if (!user) throw new NotFoundError();

      // new ApplicationApprovedPublisher(natswrapper.Client).publish({
      //   userId: user.email,
      //   message: "Application " + application.id + "is approved",
      //   applicationId: application.id,
      // });

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export { router as approveApplicationRouter };
