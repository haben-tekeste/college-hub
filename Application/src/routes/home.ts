import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Application } from "../models/application";

const router = express.Router();

router.get("/api/applications/", async (req, res, next) => {
  try {
    const applications = await Application.findById(
      req.currentUser?.id
    ).populate("Project");

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
});

export { router as allApplicationsRouter };
