import {
  BadRequestError,
  IBookUpdatedListener,
  Listener,
  Subjects,
} from "@booki/common";
import { Book } from "@booki/common/build/events/IBook";
import { Msg } from "nats";
import { Book as BookModel } from "../../models/book";
import { streamConfig } from "./consumerOptions";

export class BookUpdatedListener extends Listener<IBookUpdatedListener> {
  subject: Subjects.SBOOKUPDATED = Subjects.SBOOKUPDATED;
  deliverSubject = Subjects.SBOOKUPDATED;
  filterSubject = Subjects.PBOOKUPDATED;
  durableName = streamConfig.BUpdatedDurableName;
  streamName = streamConfig.StreamName;
  queueGroupName = streamConfig.BUpdatedQueueName;
  async onMessage(data: Book["data"], msg: Msg) {
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
      likes: data.likes,
      cloudinaryPublicId: data.cloudinaryPublicId,
    });

    await book.save();
    console.log(book);
    msg.respond();
  }
}
