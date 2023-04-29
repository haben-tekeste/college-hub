import express from "express";
import { body } from "express-validator";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../model/user";
import { PasswordManager } from "../utils/passwordManager";
import {
  BadRequestError,
  EmailVerificationError,
  validateRequest,
} from "@hthub/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("Please Provide a valid email"),
    body("password").trim().notEmpty().withMessage("Please provide password"),
  ],
  validateRequest,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) throw new BadRequestError("Invalid Email");
      const passwordMatched = await PasswordManager.comparePassword(
        existingUser.password,
        password
      );
      if (!passwordMatched) throw new BadRequestError("Invalid Credentials");

      // if (!existingUser.isVerified) throw new EmailVerificationError();

      // Generate jwt token
      const jwtToken = jsonwebtoken.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          username: existingUser.username,
        },
        process.env.JWT_KEY!
      );
      req.session = { jwt: jwtToken };
      res.status(200).json({
        jwtToken,
        email: existingUser.email,
        username: existingUser.username,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export { router as signinRouter };
