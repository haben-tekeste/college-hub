import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../Common/src";
import { User } from "../model/user";
import { randomInt } from "node:crypto";
import { Token } from "../model/token";

const router = express.Router();

router.post(
  "/api/users/forget",
  body("email").isEmail().withMessage("Email must be valid"),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      // check email
      const user = await User.findOne({ email });

      if (!user) throw new Error("Email not found");

      // generate key
      const key = randomInt(1000_000).toString().padStart(6, "0");

      const token = Token.build({ userId: user.id, token: key });

      await token.save();

      // send email (token)

      res.status(201).json({});
    } catch (error) {
      next(error);
    }
  }
);

export { router as forgetPasswordRouter };
