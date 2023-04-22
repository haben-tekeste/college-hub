import { Publisher, Subjects, EventCommentUpdated } from "@hthub/common";

export class CommentUpdatedPublisher extends Publisher<EventCommentUpdated> {
  subject: Subjects.EventCommentUpdated = Subjects.EventCommentUpdated;
}
