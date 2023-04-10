import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  errorHandler,
  currentUserMiddleware,
  isVerified,
  NotFoundError,
} from "@hthub/common";
import cookieSession from "cookie-session";
import { natswrapper } from "./nats-wrapper";
import { QuestionCreatedListener } from "./events/listeners/question-created-listener";
import { AnswerCreatedListener } from "./events/listeners/answer-created-listener";

const app = express();

//
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

// signed in and verified
app.use(currentUserMiddleware);

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
  if (!process.env.NATS_URL) throw new Error("Nats url must be defined");
  try {
    await natswrapper.connect(process.env.NATS_URL);
    await mongoose.connect(process.env.MONGO_URI);

    const jsm = await natswrapper.Client.jetstreamManager();
    await jsm.streams.add({ name: "mystream", subjects: ["events.>"] });

    // event listeners
    new QuestionCreatedListener(natswrapper.Client).listen();
    new AnswerCreatedListener(natswrapper.Client).listen();

    process.on("SIGTERM", () =>
      natswrapper.Client.close().then(() => {
        console.log("nats closed");
        process.exit();
      })
    );
  } catch (error) {
    console.error(error);
  }
  app.listen(4010, () => {
    console.log("QuestionFeed -----> 4010");
  });
};

start();
