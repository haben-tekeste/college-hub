import { Project } from "../model/project";
import express from "express";
import { NotFoundError } from "@hthub/common";

const router = express.Router();

router.get("/api/projects/", async (req, res, next) => {
  try {
    const projects = await Project.find({postedBy:req.currentUser?.id});

    if (!projects) throw new NotFoundError();

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

export { router as getAllProjectsRouter };
