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

router.put(
  "/api/users/update/credential/:userId/:token",
  body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 5 and 20")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      })
      .withMessage(
        "Passoword must include: 1 Upper case letter 1 lower case letter 1 Number 1 Sybmol"
      ),
  validateRequest,
  // isVerified,
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
      if (!user) throw new Error("User not found");

      user.set({ password });
      await user.save();
      await existingToken.deleteOne();
      // send email to notify about password update

      res.status(200).json({success:true});
    } catch (error) {
      next(error);
    }
  }
);

export {router as updatePasswordRouter}