import {
    NatsConnection,
    StringCodec,
    Msg,
    NatsError,
    ConsumerConfig,
    nanos,
    AckPolicy,
    DeliverPolicy,
    ReplayPolicy,
  } from "nats";
  import { Subjects } from "./subjects";
  
  interface Event {
    subject: Subjects;
    data: any;
  }
  
  export abstract class Listener<T extends Event> {
    protected client: NatsConnection;
    abstract subject: T["subject"];
    abstract queueGroupName: string;
    protected ackWait = 5 * 1000; //5 seconds
    abstract filterSubject: string;
    abstract durableName: string;
    abstract streamName: string;
    abstract deliverSubject: string;
    private decoder = StringCodec();
    abstract onMessage(data: T["data"], msg: Msg): void;
  
    constructor(client: NatsConnection) {
      this.client = client;
    }
  
    async listen() {
      const jsm = await this.client.jetstreamManager();
      jsm.consumers.add(this.streamName, this.consumerOptions());
  
      this.client.subscribe(this.subject, {
        queue: this.queueGroupName,
        callback: (err, msg) => {
          this.parseMessage(err, msg);
        },
      });
    }
  
    parseMessage(err: NatsError | null, msg: Msg) {
      if (err) {
        console.log(err.message);
      } else {
        try {
          const parsedData = this.decoder.decode(msg.data);
          console.log('Subject: ', msg.subject);
          console.log(`Received event: ${parsedData}`);
          this.onMessage(JSON.parse(parsedData), msg);
        } catch (error) {
          console.log("Parser: ", error);
        }
      }
    }
  
    consumerOptions(): Partial<ConsumerConfig> {
      return {
        durable_name: this.durableName,
        deliver_subject: this.deliverSubject,
        ack_policy: AckPolicy.Explicit,
        ack_wait: nanos(this.ackWait),
        filter_subject: this.filterSubject,
        deliver_policy: DeliverPolicy.All,
        replay_policy: ReplayPolicy.Instant,
        deliver_group: this.queueGroupName,
      };
    }
  }