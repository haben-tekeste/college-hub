import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import {
  currentUserMiddleware,
  isVerified,
  NotFoundError,
  errorHandler,
} from "@hthub/common";
import {
  createProfileRouter,
  getProfileRouter,
  addExperienceRouter,
  addSkillRouter,
} from "./routes";
import { natswrapper } from "./nats-wrapper";

const app = express();

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

//routes
app.use(createProfileRouter);
app.use(getProfileRouter);
app.use(addExperienceRouter);
app.use(addSkillRouter);

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
    await natswrapper.connect(process.env.NATS_URL)
    await mongoose.connect(process.env.MONGO_URI);

    const jsm = await natswrapper.Client.jetstreamManager()
    await jsm.streams.add({name: 'mystream', subjects:['events.>']})

    process.on("SIGTERM", () =>
      natswrapper.Client.close().then(() => {
        console.log("nats closed");
        process.exit();
      })
    );
  } catch (error) {
    console.error(error);
  }
  app.listen(4001, () => {
    console.log("Profile -----> 4001");
  });
};

start();
