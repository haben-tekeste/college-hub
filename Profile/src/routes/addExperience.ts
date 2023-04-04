import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Profile } from "../model/profile";

const router = express.Router();

router.post(
  "/api/profiles/experience/add",
  [
    body("title").not().isEmpty().escape(),
    body("company").not().isEmpty().isAlphanumeric().escape(),
    body("period").not().isEmpty().isNumeric(),
    body("isCurrentJob").not().isEmpty().isBoolean(),
    body("description").not().isEmpty().escape(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, company, period, isCurrentJob, description } = req.body;
      const profile = await Profile.findOne({ userId: req.currentUser?.id });
      if (!profile) throw new Error("Profile not found Error");
      profile.set({
        experiences: {
          title,
          company,
          period,
          isCurrentJob,
          description,
        },
      });
      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }
);

export {router as addExperienceRouter}