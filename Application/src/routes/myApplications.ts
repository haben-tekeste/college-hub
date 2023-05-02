import express from "express";
import { Application } from "../models/application";
import { Project } from "../models/project";

const router = express.Router();

router.get("/api/applications/myapplications", async (req, res, next) => {
  try {
    const applications = await Application.find(
      { userId: req.currentUser?.id! },
      {},
      { sort: { createdAt: -1 } }
    ).populate({ path: "projectId" });

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
});

export { router as getMyApplications };
