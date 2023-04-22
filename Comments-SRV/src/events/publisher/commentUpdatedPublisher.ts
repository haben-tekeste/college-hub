import { ICommentUpdatedPublisher, Publisher, Subjects } from "@booki/common";

export class CommentUpdatedPublisher extends Publisher<ICommentUpdatedPublisher> {
  subject: Subjects.PCOMMENTUPDATED = Subjects.PCOMMENTUPDATED;
}
