import { ICommentCreatedPublisher, Publisher, Subjects } from "@booki/common";

export class CommentCreatedPublisher extends Publisher<ICommentCreatedPublisher> {
  subject: Subjects.PCOMMENTCREATED = Subjects.PCOMMENTCREATED;
}
