import {
  BadRequestError,
  ICommentUpdatededListener,
  Listener,
  Subjects,
} from "@booki/common";
import { Comment } from "@booki/common/build/events/IComment";
import { streamConfig } from "./consumerOptions";
import { Comment as CommentModel } from "../../models/comment";
import { Msg } from "nats";

export class CommentUpdatedListener extends Listener<ICommentUpdatededListener> {
  subject: Subjects.SCOMMENTUPDATED = Subjects.SCOMMENTUPDATED;
  deliverSubject = Subjects.SCOMMENTUPDATED;
  filterSubject = Subjects.PCOMMENTUPDATED;
  durableName = streamConfig.CUpdatedDurableName;
  queueGroupName = streamConfig.CUpdatedQueueName;
  streamName = streamConfig.StreamName;
  async onMessage(data: Comment["data"], msg: Msg) {
    const comment = await CommentModel.findById(data.id);
    if (!comment) throw new BadRequestError("No Comment found");
    comment.likes = data.likes;

    await comment.save();
    console.log(comment);
    msg.respond();
  }
}
