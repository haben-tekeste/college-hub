import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import cookieSession from "cookie-session";
import {
  currentUserMiddleware,
  errorHandler,
  isVerified,
  NotFoundError,
} from "../../Common/src";
import helmet from "helmet";
import { getAllCommentsRouter, getCommentRouter, createCommentRouter, updateCommentRouter, deleteCommentRouter } from "./routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);
app.use(helmet());

// signed in and verified
app.use(currentUserMiddleware);
app.use(isVerified);

// routes
app.use(createCommentRouter)
app.use(updateCommentRouter)
app.use(deleteCommentRouter)
app.use(getAllCommentsRouter)
app.use(getCommentRouter)

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
  app.listen(4007, () => {
    console.log("Comments -----> 4007");
  });
};

start();
