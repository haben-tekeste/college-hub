import { Publisher,BlogCreatedEvent, Subjects } from "@hthub/common";

export class BlogCreatedPublisher extends Publisher<BlogCreatedEvent>{
    subject: Subjects.EventBlogCreated =    Subjects.EventBlogCreated

}