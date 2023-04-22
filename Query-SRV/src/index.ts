import { app } from "./app";
import mongoose from "mongoose";
import { UserCreatedListener } from "./events/listeners/userCreatedListener";
import { nats } from "./NatsWrapper";
import { CommentCreatedListener } from "./events/listeners/commentCreatedListener";
import { QBookCreatedListener } from "./events/listeners/bookCreatedListener";
import { ReplyCreatedListener } from "./events/listeners/replyCreatedListener";
import { ReplyUpdatedListener } from "./events/listeners/replyUpdatedListener";
import { CommentUpdatedListener } from "./events/listeners/commentUpdatedListener";
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT Failed");
  if (!process.env.MONGO_URI) throw new Error("Mongodb URI must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must defined");
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("NATS_CLUSTER_ID must defined");
  try {
    await nats.connect(process.env.NATS_URL, process.env.NATS_CLUSTER_ID);
    await mongoose.connect(process.env.MONGO_URI);
    new UserCreatedListener(nats.client).listen();
    new CommentCreatedListener(nats.client).listen();
    new QBookCreatedListener(nats.client).listen();
    new ReplyCreatedListener(nats.client).listen();
    new ReplyUpdatedListener(nats.client).listen();
    new CommentUpdatedListener(nats.client).listen();

    process.on("SIGTERM", () => {
      nats.client.close();
    });
  } catch (error) {
    console.error(error);
  }
  app.listen(3003, () => {
    console.log("QUERY_SRV <-----> 3003");
  });
};

start();
