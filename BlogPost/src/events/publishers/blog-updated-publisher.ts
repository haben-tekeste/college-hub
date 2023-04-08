import { Subjects, BlogUpdatedEvent, Publisher } from "@hthub/common";

export class BlogUpdatedPublisher extends Publisher<BlogUpdatedEvent>{
    subject: Subjects.EventBlogUpdated = Subjects.EventBlogUpdated
}