import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import {
  isVerified,
  NotFoundError,
  validateRequest,
} from "@hthub/common";
import { Token } from "../model/token";
import { User } from "../model/user";

const router = express.Router();

router.post(
  "/api/users/update/credential/:userId/:token",
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("New password must be between 8 and 20"),
  validateRequest,
  isVerified,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      const { userId, token } = req.params;
      const existingToken = await Token.findOne({
        userId,
        token,
      });

      if (!existingToken) {
        // generate new token
        // delete existing token
        // send email

        throw new Error("Invalid link or link expired");
      }

      // verify token
      const user = await User.findById(userId);
      if (!user) throw new NotFoundError();

      user.set({ password });
      await user.save();
      await existingToken.deleteOne();
      // send email to notify about password update

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
);
