import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Application } from "../models/application";

const router = express.Router();

router.get("/api/applications/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const applications = await Application.find({ projectId }).populate({
      path: "Project",
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
