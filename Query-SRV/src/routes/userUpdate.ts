import { BadRequestError, isAuth } from "@booki/common";
import express, { Response, Request, NextFunction, json } from "express";
import { User } from "../models/user";
import multer from "multer";
import { cloudinaryConfig, multerUploads } from "../utils/config";
import fs from "fs";

const router = express.Router();

interface IBody {
  interests: string[];
}

router.put(
  "/api/query/user-update",
  isAuth,
  multerUploads,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { interests } = req.body;

      let result;
      const user = await User.findById(req.currentUser?.id);
      const file = req.file;

      if (!user) throw new BadRequestError("User not found");

      if (file) {
        const v2 = cloudinaryConfig();
        const encodedData = file.buffer.toString("base64");
        const finalData = `data:${file.mimetype};base64,${encodedData}`;
        const { secure_url } = await v2.uploader.upload(finalData, {
          folder: "Booki/avatar",
        });
        result = secure_url;
      }
      interests = JSON.parse(interests);
      user.avatar = result;
      user.interests = interests;

      await user.save();

      res.send(user);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as userUpdate };
