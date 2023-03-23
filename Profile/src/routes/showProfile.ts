import mongoose from "mongoose";
import express from "express";
import { NotFoundError } from "@hthub/common";
import { Profile } from "../model/profile";

const router = express.Router();

router.get("/api/profiles/:profileId", async (req, res, next) => {
  try {
    const { profileId } = req.params;
    if (!profileId) throw new NotFoundError();
    const profile = await Profile.findById(profileId);
    if (!profile) throw new NotFoundError();

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
});

export { router as getProfileRouter };
