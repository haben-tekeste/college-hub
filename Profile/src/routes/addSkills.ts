import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "@hthub/common";
import { Profile } from "../model/profile";

const router = express.Router();

// name: string;
// score: number;

router.post(
  "/api/profiles/skills/add",
  [
    body("name").not().isEmpty().isAlpha().escape(),
    body("score").not().isEmpty().isInt({ min: 1, max: 10 }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, score } = req.body;
      const profile = await Profile.findOne({ userId: req.currentUser?.id });
      if (!profile) throw new Error("Profile not found Error");

      let existingSkills = profile.skills?.map((skill) => skill) || [];

      const found = existingSkills?.find((skill) => skill.name == name);

      if (found) {
        existingSkills?.map((skill) => {
          if (skill.name == name) skill.score = score;
        });
      } else {
        existingSkills.push({ name, score });
      }

      profile.set({
        skills: existingSkills,
      });
      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }
);
