// import cohere from "cohere-ai";

import { CommentCreatedListener } from "./events/listeners/comment-created-listener";
import { natswrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.NATS_URL) throw new Error("Nats url must be defined");
  try {
    //   cohere.init("<<apiKey>>");
    //   const response = await cohere.classify({
    //     inputs: inputs,
    //     examples: examples,
    //   });
    await natswrapper.connect(process.env.NATS_URL);
    const jsm = await natswrapper.Client.jetstreamManager();
    await jsm.streams.add({ name: "mystream", subjects: ["events.>"] });

    new CommentCreatedListener(natswrapper.Client).listen()
    
    console.log("Expiration ------> Running");
  } catch (error) {
    console.log(error);
  }
};

start();
