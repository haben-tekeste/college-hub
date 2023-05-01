import { IQBookCreatedListener, Listener, Subjects } from "@booki/common";
import { QBook } from "@booki/common/build/events/IBook";
import { Msg } from "nats";
import { Book as BookModel } from "../../models/book";
import { streamConfig } from "./consumerOptions";

export class QBookCreatedListener extends Listener<IQBookCreatedListener> {
  subject: Subjects.SQBOOKCREATED = Subjects.SQBOOKCREATED;
  deliverSubject = Subjects.SQBOOKCREATED;
  filterSubject = Subjects.PQBOOKCREATED;
  durableName = streamConfig.BCreatedDurableName;
  streamName = streamConfig.StreamName;
  queueGroupName = streamConfig.BCreatedQueueName;
  async onMessage(data: QBook["data"], msg: Msg) {
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
      comments: data.comments,
      likes: data.likes,
      cloudinaryPublicId: data.cloudinaryPublicId,
      show: true,
    });

    await book.save();
    console.log(book);
    msg.respond();
  }
}
