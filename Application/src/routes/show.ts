import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Application } from "../models/application";

const router = express.Router();

router.get("/api/applications/:applicationId", async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.find({
      _id: applicationId,
      userId: req.currentUser?.id,
    }).populate("Project");
    if (!application) throw new Error("Application not found");
    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
});

export { router as getApplicationRouter };
