import express from "express";
import { Application } from "../models/application";
import { Project } from "../models/project";

const router = express.Router();

router.get("/api/applications/", async (req, res, next) => {
  try {
    const projects = await Project.find(
      { postedBy: req.currentUser?.id },
      {},
      { sort: { createdAt: -1 } }
    ).populate({ path: "applications" });

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);

    next(error);
  }
});

export { router as allApplicationsRouter };
