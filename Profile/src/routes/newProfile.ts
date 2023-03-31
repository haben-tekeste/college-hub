import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@hthub/common";
import { Profile } from "../model/profile";

const router = express.Router();

router.get(
  "/api/profiles/new",
  [
    body("major").trim().not().isEmpty().escape(),
    body("concentration").trim().not().isEmpty().escape(),
    body("yearOfStudy").trim().not().isEmpty().escape(),
    body("summary").trim().not().isEmpty().escape(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        major,
        concentration,
        yearOfStudy,
        summary,
        skills,
        cGPA,
        experiences,
      } = req.body;

      const user = await Profile.findOne({ userId: req.currentUser?.id });
      if (user) throw new BadRequestError("Profile exists");
      const id = req.currentUser?.id || "";
      const profile = Profile.build({
        major,
        concentration,
        yearOfStudy,
        summary,
        userId: id,
      });

      if (skills) profile.set({ skills });
      if (cGPA) profile.set({ cGPA });
      if (experiences) profile.set({ experiences });

      await profile.save();

      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }
);

export { router as createProfileRouter };
