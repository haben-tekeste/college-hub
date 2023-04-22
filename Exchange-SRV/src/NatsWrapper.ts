import { NatsConnection, connect } from "nats";

class NatsWrapper {
  private _client?: NatsConnection;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access Nats client before initalizing");
    }
    return this._client;
  }

  async connect(url: string, name: string) {
    this._client = await connect({ servers: url, name: name });
    console.log("nats Connected");

    const jsm = await this._client.jetstreamManager();
    await jsm.streams.add({
      name: "mystream",
      subjects: ["events.>"],
      max_consumers: -1,
      description: "booki jetStream",
    });
    return new Promise((res, rej) => {
      try {
        res(this._client);
      } catch (err) {
        rej(err);
      }
    });
  }
}

export const nats = new NatsWrapper();
