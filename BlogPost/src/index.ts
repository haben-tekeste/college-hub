import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import cookieSession from "cookie-session";
import cohere from "cohere-ai";
import {
  currentUserMiddleware,
  errorHandler,
  isVerified,
  NotFoundError,
} from "@hthub/common";
import helmet from "helmet";
import deepai from "deepai";
import {
  getAllBlogsRouter,
  getBlogRouter,
  createBlogRouter,
  updateBlogRouter,
  deleteBlogRouter,
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
app.use(helmet());

// signed in and verified
app.use(currentUserMiddleware);

// routes
app.use(createBlogRouter);
app.use(getAllBlogsRouter);
app.use(getBlogRouter);
app.use(updateBlogRouter);
app.use(deleteBlogRouter);

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
  // if (!process.env.DEEPAI_KEY) throw new Error("Deepai key must be defined")
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await natswrapper.connect(process.env.NATS_URL);
    
    const jsm = await natswrapper.Client.jetstreamManager();
    await jsm.streams.add({ name: "mystream", subjects: ["events.>"] });

    process.on("SIGTERM", () =>
      natswrapper.Client.close().then(() => {
        console.log("nats closed");
        process.exit();
      })
    );
  } catch (error) {
    console.error(error);
  }
  app.listen(4006, () => {
    console.log("BlogPost -----> 4006");
  });
};

start();
