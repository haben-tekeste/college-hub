import { Subjects, Listener, CommentUpdated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { classifyComment } from "../../toxicity";
import { natswrapper } from "../../nats-wrapper";
import { CommentModeratedPublisher } from "../publishers/comment-moderated-publisher";

export class CommentUpdatedListener extends Listener<CommentUpdated> {
  subject: Subjects.CommentUpdated = Subjects.CommentUpdated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventCommentUpdated;
  durableName = "comment-updated-moderation-srv";
  streamName = "mystream";
  deliverSubject = Subjects.CommentUpdated;
  async onMessage(data: CommentUpdated["data"], msg: Msg) {
    const { id, content, status } = data;
    const commentStatus = await classifyComment(content);

    await new CommentModeratedPublisher(natswrapper.Client).publish({
      id,
      content,
      status: commentStatus,
    });

    msg.respond();
  }
}
