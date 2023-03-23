import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import {
  currentuserRouter,
  forgetPasswordRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
  verifyEmailRouter,
} from "./routes";
import { NotFoundError, errorHandler } from "@hthub/common";
import cookieSession from "cookie-session";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    // secure: true,
    signed: false,
  })
);

// routes
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentuserRouter);
app.use(verifyEmailRouter);
app.use(forgetPasswordRouter);

// 404 error
app.use("*", (req, res) => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);


const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT Failed");
  if (!process.env.MONGO_URI) throw new Error('Mongodb URI must be defined')
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
  app.listen(4000, () => {
    console.log("Authentication -----> 4000");
  });
};

