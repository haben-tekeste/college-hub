import { AnswerCreatedListener } from "./events/listeners/answer-created-listener";
import { ApplicationApprovedListener } from "./events/listeners/application-approved-listener";
import { ApplicationRejectedListener } from "./events/listeners/application-rejected-listener";
import { natswrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.NATS_URL) throw new Error("Nats url must be defined");
  try {
    await natswrapper.connect(process.env.NATS_URL);
    const jsm = await natswrapper.Client.jetstreamManager();
    await jsm.streams.add({ name: "mystream", subjects: ["events.>"] });

    new AnswerCreatedListener(natswrapper.Client).listen();
    new ApplicationApprovedListener(natswrapper.Client).listen();
    new ApplicationRejectedListener(natswrapper.Client).listen();

    console.log("Notification ------> Running");
  } catch (error) {
    console.log(error);
  }
};

start();
