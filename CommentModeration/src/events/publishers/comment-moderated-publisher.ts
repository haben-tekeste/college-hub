import { Subjects, Publisher, CommentModeratedEvent } from "@hthub/common";

export class CommentModeratedPublisher extends Publisher<CommentModeratedEvent> {
  subject: Subjects.EventCommentModerated = Subjects.EventCommentModerated;
}
