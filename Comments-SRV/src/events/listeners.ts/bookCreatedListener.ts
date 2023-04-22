import { IBookCreatedListener, Listener, Subjects } from "@booki/common";
import { Book } from "@booki/common/build/events/IBook";
import { Msg } from "nats";
import { Book as BookModel } from "../../models/book";
import { consumerConfig } from "./consumerConfig";

export class BookCreatedListener extends Listener<IBookCreatedListener> {
  subject: Subjects.SBOOKCREATED = Subjects.SBOOKCREATED;
  deliverSubject = Subjects.SBOOKCREATED;
  filterSubject = Subjects.PBOOKCREATED;
  durableName = consumerConfig.BCreatedDurableName;
  streamName = consumerConfig.StreamName;
  queueGroupName = consumerConfig.BCreatedQueueName;
  async onMessage(data: Book["data"], msg: Msg) {
    const book = BookModel.build({
      id: data.id,
    });

    await book.save();
    console.log(book);
    msg.respond();
  }
}
