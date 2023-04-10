import { Subjects, Listener, CommentApproved } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Comment } from "../../models/comment";

export class CommentApprovedListener extends Listener<CommentApproved> {
  subject: Subjects.CommentApproved = Subjects.CommentApproved;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventCommentApproved;
  durableName = "comment-approved-blog-feed-service";
  deliverSubject = Subjects.CommentApproved;
  streamName = "mystream";
  async onMessage(data: CommentApproved["data"], msg: Msg) {
    const { id, content, author, blogId, parentId, createdAt, approval } = data;

    // check if comment already exists
    const comment = await Comment.findById(id);
    if (comment) throw new Error("Cant duplicate comment");

    // save to records
    const newComment = Comment.build({
      id,
      content,
      author,
      blogId,
      parentId,
      createdAt: new Date(createdAt),
    });

    newComment.set({ approval: "Approved" });
    await newComment.save();
    msg.respond();
  }
}