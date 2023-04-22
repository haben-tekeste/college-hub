import { Subjects, Publisher, EventCommentLiked } from "@hthub/common";

export class CommentLikedPublisher extends Publisher<EventCommentLiked> {
  subject: Subjects.EventCommentLiked = Subjects.EventCommentLiked;
}
