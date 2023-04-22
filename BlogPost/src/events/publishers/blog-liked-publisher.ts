import { Subjects, Publisher, EventBlogLiked } from "@hthub/common";

export class BlogLikedPublisher extends Publisher<EventBlogLiked> {
  subject: Subjects.EventBlogLiked = Subjects.EventBlogLiked;
}
