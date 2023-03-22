import express from "express";
import { Profile } from "../model/profile";
import { Project } from "../model/project";

const router = express.Router();

router.get("/api/projectfeed", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.currentUser?.id });
    let projects;
    if (!profile) {
      projects = await Project.find({}).limit(15);
    }

    projects = await Project.find({
      $or: [
        {
          skillSet: {
            $in: profile?.skills,
          },
        },
      ],
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

export { router as getFeedRouter };
