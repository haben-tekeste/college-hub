import { Subjects, Publisher, CommentApprovedEvent } from "@hthub/common";

export class CommentApprovedPublisher extends Publisher<CommentApprovedEvent> {
  subject: Subjects.EventCommentApproved = Subjects.EventCommentApproved;
}
