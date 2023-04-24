import { Subjects, Listener, CommentApproved } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Comment } from "../../models/comment";
import { Blog } from "../../models/blog";
import { NotFoundError } from "@hthub/common";

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

    const blog = await Blog.findById(blogId);
    if (!blog) throw new NotFoundError();

    if (comment) {
      // update comment
      comment.set({ content });
      comment.set({ approval: "Approved" });
      return msg.respond();
    }
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
    blog.comments.push(newComment.id);
    await blog.save();
    msg.respond();
  }
}
