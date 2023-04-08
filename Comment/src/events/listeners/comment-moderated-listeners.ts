import { Subjects, Listener, CommentModerated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Comment } from "../../model/comment";
import { CommentApprovedPublisher } from "../publishers/comment-approved-publisher";
import { natswrapper } from "../../nats-wrapper";

export class CommentModeratedListener extends Listener<CommentModerated> {
  subject: Subjects.CommentModerated = Subjects.CommentModerated;
  queueGroupName: string = queueGroupName;
  filterSubject = Subjects.EventCommentModerated;
  durableName = "comment-moderated-comment-service";
  streamName = "mystream";
  deliverSubject = Subjects.CommentModerated;
  async onMessage(
    data: { id: string; content: string; status: string },
    msg: Msg
  ) {
    const { id, status } = data;
    const comment = await Comment.findById(id);
    if (!comment) throw new Error("Comment not found");
    if (status === "Rejected") {
      comment.set({ status: "Rejected" });
    } else {
      comment.set({ status: "Approved" });
      new CommentApprovedPublisher(natswrapper.Client).publish({
        id: comment.id,
        content: comment.content,
        author: comment.author,
        parentId: comment.parentId,
        approval: "Approved",
        createdAt: comment.createdAt.toISOString(),
        blogId: comment.blogId,
      });
    }
    await comment.save();
    msg.respond();
  }
}
