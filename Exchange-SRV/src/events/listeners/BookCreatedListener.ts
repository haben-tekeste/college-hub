import { IBookCreatedListener, Listener, Subjects } from "@booki/common";
import { Book } from "@booki/common/build/events/IBook";
import { Msg } from "nats";
import { Book as BookModel } from "../../models/book";
import { streamConfig } from "./consumerOptions";

export class BookCreatedListener extends Listener<IBookCreatedListener> {
  subject: Subjects.SBOOKCREATED = Subjects.SBOOKCREATED;
  deliverSubject = Subjects.SBOOKCREATED;
  filterSubject = Subjects.PBOOKCREATED;
  durableName = streamConfig.BCreatedDurableName;
  streamName = streamConfig.StreamName;
  queueGroupName = streamConfig.BCreatedQueueName;
  async onMessage(data: Book["data"], msg: Msg) {
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
      likes: data.likes,
      cloudinaryPublicId: data.cloudinaryPublicId,
    });

    await book.save();
    console.log(book);
    msg.respond();
  }
}
