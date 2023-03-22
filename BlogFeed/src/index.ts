import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import {
  currentUserMiddleware,
  errorHandler,
  isVerified,
  NotFoundError,
} from "../../Common/src";
import mongoose from 'mongoose'

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// signed in and verified
app.use(currentUserMiddleware);
app.use(isVerified);


// routes


// 404 error
app.use("*", (req, res) => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT Failed");
  if (!process.env.MONGO_URI) throw new Error("Mongodb URI must be defined");
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
  app.listen(4008, () => {
    console.log("BlogFeed -----> 4008");
  });
};

start();