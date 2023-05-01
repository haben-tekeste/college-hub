import { app } from "./app";
import mongoose from "mongoose";
import { nats } from "./NatsWrapper";
import { BookCreatedListener } from "./events/listeners/BookCreatedListener";
import { BookUpdatedListener } from "./events/listeners/BookUpdatedListener";
import { UserCreatedListener } from "./events/listeners/userCreatedListener";
const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT Failed");
  if (!process.env.MONGO_URI) throw new Error("Mongodb URI must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must defined");
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("NATS_CLUSTER_ID must defined");
  try {
    await nats.connect(process.env.NATS_URL, process.env.NATS_CLUSTER_ID);
    new BookCreatedListener(nats.client).listen();
    new BookUpdatedListener(nats.client).listen();
    new UserCreatedListener(nats.client).listen();
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
  app.listen(3004, () => {
    console.log("EXCHANGE-SRV <-----> 3004");
  });
};

start();
