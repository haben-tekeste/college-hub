import {
  BadRequestError,
  IQBookUpdatedListener,
  Listener,
  Subjects,
} from "@booki/common";
import { QBook } from "@booki/common/build/events/IBook";
import { Msg } from "nats";
import { Book as BookModel } from "../../models/book";
import { streamConfig } from "./consumerOptions";

export class QBookUpdatedListener extends Listener<IQBookUpdatedListener> {
  subject: Subjects.SQBOOKUPDATED = Subjects.SQBOOKUPDATED;
  deliverSubject = Subjects.SQBOOKUPDATED;
  filterSubject = Subjects.PQBOOKUPDATED;
  durableName = streamConfig.BUpdatedDurableName;
  streamName = streamConfig.StreamName;
  queueGroupName = streamConfig.BUpdatedQueueName;
  async onMessage(data: QBook["data"], msg: Msg) {
    const book = await BookModel.findById(data.id);
    if (!book)
      throw new BadRequestError("Book not found in QBookUpdatedListener");
    book.set({
      title: data.title,
      author: data.author,
      description: data.description,
      genre: data.genre,
      coverImageUrl: data.coverImage,
      publishedDate: data.publishedDate,
      ownerId: book.ownerId,
      condition: data.condition,
      comments: book.comments,
      likes: data.likes,
      cloudinaryPublicId: data.cloudinaryPublicId,
      show: book.show,
    });

    await book.save();
    console.log(book);
    msg.respond();
  }
}
