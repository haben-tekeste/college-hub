import mongoose from "mongoose";
import cors from "cors";
import express from "express";

import {
  currentUserMiddleware,
  isVerified,
  errorHandler,
  NotFoundError,
  isAuth
} from "@hthub/common";
import cookieSession from "cookie-session";
import {
  newApplicationRouter,
  rejectApplicationRouter,
  approveApplicationRouter,
  allApplicationsRouter,
  getApplicationRouter,
  getProjectApplicationsRouter,
} from "./routes";


import { natswrapper } from "./nats-wrapper";
import { ProjectCreatedListener } from "./events/listeners/project-created-listener";

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
app.use(isAuth);

// routes
app.use(newApplicationRouter);
app.use(rejectApplicationRouter);
app.use(getApplicationRouter);
app.use(allApplicationsRouter);
app.use(getProjectApplicationsRouter);
app.use(approveApplicationRouter);

// // 404 error
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
    new ProjectCreatedListener(natswrapper.Client).listen();

    process.on("SIGTERM", () =>
      natswrapper.Client.close().then(() => {
        console.log("nats closed");
        process.exit();
      })
    );
  } catch (error) {
    console.error(error);
  }
  app.listen(4005, () => {
    console.log("Application -----> 4005");
  });
};

start();
