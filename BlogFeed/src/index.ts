import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import {
  currentUserMiddleware,
  errorHandler,
  NotFoundError,
  isAuth,
} from "@hthub/common";
import mongoose from "mongoose";
import { elasticClient } from "./elastic-search";
import { natswrapper } from "./nats-wrapper";
import { CommentApprovedListener } from "./events/listeners/comment-approved-listeners";
import { BlogCreatedListener } from "./events/listeners/blog-created-listeners";
import { BlogUpdatedListener } from "./events/listeners/blog-updated-listener";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import {
  getBlogFeedRouter,
  getBlogRouter,
  myBlogsRouter,
  searchBlogRouter,
} from "./routes";

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
app.use(isAuth);

// routes
app.use(myBlogsRouter);
app.use(getBlogFeedRouter);
app.use(getBlogRouter);
app.use(searchBlogRouter);

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
    // await elasticClient.createIndex("blogsfeed");

    // listeners
    new CommentApprovedListener(natswrapper.Client).listen();
    new BlogCreatedListener(natswrapper.Client).listen();
    new BlogUpdatedListener(natswrapper.Client).listen();
    new UserCreatedListener(natswrapper.Client).listen();

    process.on("SIGTERM", () =>
      natswrapper.Client.close().then(() => {
        console.log("nats closed");
        process.exit();
      })
    );
  } catch (error) {
    console.error(error);
  }
  app.listen(4008, () => {
    console.log("BlogFeed -----> 4008");
  });
};

start();
