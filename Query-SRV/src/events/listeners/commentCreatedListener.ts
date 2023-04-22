import { ICommentCreatedListener, Listener, Subjects } from "@booki/common";
import { Comment } from "@booki/common/build/events/IComment";
import { Msg } from "nats";
import { Book } from "../../models/book";
import { Comment as CommentModel } from "../../models/comment";
import { streamConfig } from "./consumerOptions";
export class CommentCreatedListener extends Listener<ICommentCreatedListener> {
  subject: Subjects.SCOMMENTCREATED = Subjects.SCOMMENTCREATED;
  deliverSubject = Subjects.SCOMMENTCREATED;
  filterSubject = Subjects.PCOMMENTCREATED;
  durableName = streamConfig.CCreatedDurableName;
  queueGroupName = streamConfig.CCreatedQueueName;
  streamName = streamConfig.StreamName;
  async onMessage(data: Comment["data"], msg: Msg) {
    const book = await Book.findById(data.bookId);
    const comment = CommentModel.build({
      text: data.text,
      userId: data.userId,
      bookId: data.bookId,
      likes: data.likes,
      reply: [],
      id: data.id,
    });

    book?.comments.push(comment.id);
    await book?.save();
    await comment.save();
    console.log(await book?.populate("comments"));
    console.log(comment);
    msg.respond();
  }
}
