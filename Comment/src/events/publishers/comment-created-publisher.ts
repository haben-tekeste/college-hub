import { Publisher, Subjects, CommentCreatedEvent } from "@hthub/common";

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
  subject: Subjects.EventCommentCreated = Subjects.EventCommentCreated;
}
