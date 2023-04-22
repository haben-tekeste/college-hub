import {
  BadRequestError,
  IReplyCreatedListener,
  Listener,
  Subjects,
} from "@booki/common";
import { Replay } from "@booki/common/build/events/IReply";
import { Msg } from "nats";
import { Comment } from "../../models/comment";
import { Reply as ReplyModel } from "../../models/reply";
import { streamConfig } from "./consumerOptions";

export class ReplyCreatedListener extends Listener<IReplyCreatedListener> {
  subject: Subjects.SREPLYCREATED = Subjects.SREPLYCREATED;
  deliverSubject = Subjects.SREPLYCREATED;
  filterSubject = Subjects.PREPLYCREATED;
  durableName = streamConfig.RCreatedDurableName;
  streamName = streamConfig.StreamName;
  queueGroupName = streamConfig.RCreatedQueueName;
  async onMessage(data: Replay["data"], msg: Msg) {
    const comment = await Comment.findById(data.commentId);
    if (!comment) throw new BadRequestError("Comment not found");
    const reply = ReplyModel.build({
      id: data.id,
      userId: data.userId,
      likes: data.likes,
      text: data.text,
    });

    await reply.save();

    comment.reply.push(reply);

    await comment.save();
    console.log(comment);
    msg.respond();
  }
}
