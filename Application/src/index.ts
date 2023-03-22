import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import {
  currentUserMiddleware,
  isVerified,
  errorHandler,
  NotFoundError,
} from "../../Common/src";
import cookieSession from "cookie-session";
import { newApplicationRouter } from "./routes/new";
import { updateApplicationRouter } from "./routes/update";
import { getApplicationRouter } from "./routes/show";
import { allApplicationsRouter } from "./routes/home";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

// middlewares
app.use(currentUserMiddleware);
app.use(isVerified);

// routes
app.use(newApplicationRouter);
app.use(updateApplicationRouter);
app.use(getApplicationRouter);
app.use(allApplicationsRouter);

// // 404 error
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
  app.listen(4005, () => {
    console.log("Application -----> 4005");
  });
};

start();
