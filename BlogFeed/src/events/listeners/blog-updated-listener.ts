import { Subjects, Listener, BlogUpdated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import { Blog } from "../../models/blog";
import { elasticClient } from "../../elastic-search";

export class BlogUpdatedListener extends Listener<BlogUpdated> {
  subject: Subjects.BlogUpdated = Subjects.BlogUpdated;
  queueGroupName = queueGroupName;
  filterSubject = Subjects.EventBlogUpdated;
  durableName = "blog-updated-blog-feed-service";
  streamName = "mystream";
  deliverSubject = Subjects.BlogUpdated;
  async onMessage(data: BlogUpdated["data"], msg: Msg) {
    const { id, title, content } = data;
    //
    const blog = await Blog.findById(id);
    if (!blog) throw new Error("Blog not found");

    //
    blog.set(title);
    blog.set(content);

    await blog.save();
    // add to elastic
    await elasticClient.createPost("Blogs", {
      id: blog.id,
      title: blog.title,
      summary: blog.summary,
      tags: blog.tags,
    });
    msg.respond();
  }
}
