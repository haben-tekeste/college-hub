import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  errorHandler,
  currentUserMiddleware,
  isAuth,
  NotFoundError,
} from "@hthub/common";
import cookieSession from "cookie-session";
import { elasticClient } from "./elastic-search";
import { getFeedRouter } from "./routes/home";
import { searchTermRouter } from "./routes/search";
import { natswrapper } from "./nats-wrapper";
import { ProjectCreatedListener } from "./events/listeners/project-created-listener";
import { ProfileCreatedListener } from "./events/listeners/profile-created-listener";

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
app.use(isAuth);

// routes
app.use(getFeedRouter);
app.use(searchTermRouter);

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
  if (!process.env.ELASTIC_CLOUD_ID)
    throw new Error("Elastic ID must be defined");
  if (!process.env.ELASTIC_USERNAME)
    throw new Error("Elastic Cloud username must be defined");
  if (!process.env.ELASTIC_PASSWORD)
    throw new Error("Elastic passowrd must be defined");
  try {
    await natswrapper.connect(process.env.NATS_URL);
    await elasticClient.connect(
      process.env.ELASTIC_CLOUD_ID,
      process.env.ELASTIC_USERNAME,
      process.env.ELASTIC_PASSWORD
    );
    await mongoose.connect(process.env.MONGO_URI);

    const jsm = await natswrapper.Client.jetstreamManager();
    await jsm.streams.add({ name: "mystream", subjects: ["events.>"] });

    // add index
    await elasticClient.createIndex("Projects");

    // event listeners
    new ProjectCreatedListener(natswrapper.Client).listen();
    new ProfileCreatedListener(natswrapper.Client).listen();

    process.on("SIGTERM", () =>
      natswrapper.Client.close().then(() => {
        console.log("nats closed");
        process.exit();
      })
    );
  } catch (error) {
    console.error(error);
  }
  app.listen(4004, () => {
    console.log("ProjectFeed -----> 4004");
  });
};

start();
