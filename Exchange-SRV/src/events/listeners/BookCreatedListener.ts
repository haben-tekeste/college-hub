import { IEBookCreatedListener, Listener, Subjects } from "@booki/common";
import { EBook } from "@booki/common/build/events/IBook";
import { Msg } from "nats";
import { Book as BookModel } from "../../models/book";
import { streamConfig } from "./consumerOptions";

export class EBookCreatedListener extends Listener<IEBookCreatedListener> {
  subject: Subjects.SEBOOKCREATED = Subjects.SEBOOKCREATED;
  deliverSubject = Subjects.SEBOOKCREATED;
  filterSubject = Subjects.PEBOOKCREATED;
  durableName = streamConfig.BCreatedDurableName;
  streamName = streamConfig.StreamName;
  queueGroupName = streamConfig.BCreatedQueueName;
  async onMessage(data: EBook["data"], msg: Msg) {
    const book = BookModel.build({
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      genre: data.genre,
      coverImageUrl: data.coverImage,
      publishedDate: data.publishedDate,
      ownerId: data.ownerId,
      condition: data.condition,
    });

    await book.save();
    console.log(book);
    msg.respond();
  }
}
