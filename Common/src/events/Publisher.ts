import { NatsConnection, StringCodec, JetStreamManager } from "nats";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  protected client: NatsConnection;
  abstract subject: T["subject"];
  private encoder = StringCodec();

  constructor(client: NatsConnection) {
    this.client = client;
  }

  async addStream(
    jsm: JetStreamManager,
    streamName: string,
    subjects: string[]
  ) {
    await jsm.streams.add({ name: streamName, subjects });
  }

  publish(data: T["data"]): Promise<void> {
    const js = this.client.jetstream();

    return new Promise((resolve, reject) => {
      try {
        js.publish(this.subject, this.encoder.encode(JSON.stringify(data)));
        console.log("Event published to subject", this.subject);
        resolve();
      } catch (error) {
        console.log("publish error: ", data);

        reject(error);
      }
    });
  }
}
