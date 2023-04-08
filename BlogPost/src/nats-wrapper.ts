import { NatsConnection, connect } from "nats";

class NatsWrapper {
  private _client?: NatsConnection;

  get Client() {
    if (!this._client) {
      throw new Error("Can't access NATS client before connection");
    }
    return this._client;
  }

  async connect(server: string) {
    this._client = await connect({
      servers: server,
    });
    console.log("Connected to NATS server !!!!");

    return new Promise((resolve, reject) => {
      try {
        resolve(this._client);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const natswrapper = new NatsWrapper();