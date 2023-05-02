import express from "express";
import { body } from "express-validator";
import {
  NotAuthorizedError,
  NotFoundError,
  validateRequest,
} from "@hthub/common";
import { Application } from "../models/application";
import { ApplicationStatus } from "../types/applicationStatus";
import { User } from "../models/user";
import { natswrapper } from "../nats-wrapper";
import { ApplicationRejectedPublisher } from "../events/publishers/application-rejected-publisher";

const router = express.Router();

router.put(
  "/api/applications/reject/:applicationId",
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

      application.set({ status: ApplicationStatus.Rejected });

      await application.save();

      const user = await User.findById(application.userId);

      if (!user) throw new NotFoundError();

      // new ApplicationRejectedPublisher(natswrapper.Client).publish({
      //   userId: user.email,
      //   message: "Application " + application.id + "is rejected",
      //   applicationId: application.id,
      // });

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export { router as rejectApplicationRouter };
