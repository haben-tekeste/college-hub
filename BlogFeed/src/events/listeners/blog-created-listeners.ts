import { Subjects, Listener, BlogCreated } from "@hthub/common";
import { Msg } from "nats";
import { queueGroupName } from "./queue-group-name";
import {Blog} from "../../models/blog"

export class BlogCreatedListener extends Listener<BlogCreated>{
    subject: Subjects.BlogCreated = Subjects.BlogCreated
    queueGroupName = queueGroupName
    filterSubject = Subjects.EventBlogCreated
    durableName = 'blog-created-blog-feed-service'
    streamName = "mystream"
    deliverSubject =Subjects.BlogCreated
    async onMessage(data: BlogCreated['data'], msg: Msg){
        const {id, content, title, author, createdAt, summary, tags } = data

        // check if blog already exists
        const blog = await Blog.findById(id)
        if (blog) throw new Error("Blog already exists")

        // create blog
        const newBlog = Blog.build({
            id, content, title, author, createdAt : new Date(createdAt), summary, tags
        })

        await newBlog.save()
        msg.respond()
    }
    
}