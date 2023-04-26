import { app } from "./app";
import mongoose from "mongoose";
import { nats } from "./NatsWrapper";
import { CBookCreatedListener } from "./events/listeners.ts/bookCreatedListener";
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT Failed");
  if (!process.env.MONGO_URI) throw new Error("Mongodb URI must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must defined");
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("NATS_CLUSTER_ID must defined");
  try {
    await nats.connect(process.env.NATS_URL, process.env.NATS_CLUSTER_ID);
    await mongoose.connect(process.env.MONGO_URI);
    new CBookCreatedListener(nats.client).listen();
  } catch (error) {
    console.error(error);
  }
  app.listen(3002, () => {
    console.log("COMMENT_SRV <-----> 3002");
  });
};

start();
