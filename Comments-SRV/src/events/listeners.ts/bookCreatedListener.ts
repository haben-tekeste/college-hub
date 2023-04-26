import { ICBookCreatedListener, Listener, Subjects } from "@booki/common";
import { CBook } from "@booki/common/build/events/IBook";
import { Msg } from "nats";
import { Book as BookModel } from "../../models/book";
import { consumerConfig } from "./consumerConfig";

export class CBookCreatedListener extends Listener<ICBookCreatedListener> {
  subject: Subjects.SCBOOKCREATED = Subjects.SCBOOKCREATED;
  deliverSubject = Subjects.SCBOOKCREATED;
  filterSubject = Subjects.PCBOOKCREATED;
  durableName = consumerConfig.BCreatedDurableName;
  streamName = consumerConfig.StreamName;
  queueGroupName = consumerConfig.BCreatedQueueName;
  async onMessage(data: CBook["data"], msg: Msg) {
    const book = BookModel.build({
      id: data.id,
    });

    await book.save();
    console.log(book);
    msg.respond();
  }
}
