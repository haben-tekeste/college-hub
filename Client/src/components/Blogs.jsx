import React from "react";
import styled from "styled-components";

//components
import BlogItem from "./BlogItem";

const Blogs = ({blogs}) => {
  // const blogs = [
  //   {
  //     title: "chatGPT stuff",
  //     author: "Ahmed",
  //     createdAt: "3 days ago",
  //     content: "content of the blog, this blog is interesting indeed",
  //     summary:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus eum perspiciatis similique incidunt quae placeat. Quas impedit dolor iusto sint.",
  //     likes: 40,
  //     imgUrl:
  //       "https://investingnews.com/media-library/image-of-hand-holding-an-ai-face-looking-at-the-words-chatgpt-openai.jpg?id=32871272&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0",
  //   },
  //   {
  //     title: "chatGPT stuff",
  //     author: "ahmed",
  //     createdAt: "3 days ago",
  //     content: "content of the blog, this blog is interesting indeed",
  //     summary:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus eum perspiciatis similique incidunt quae placeat. Quas impedit dolor iusto sint.",
  //     likes: 40,
  //     imgUrl:
  //       "https://investingnews.com/media-library/image-of-hand-holding-an-ai-face-looking-at-the-words-chatgpt-openai.jpg?id=32871272&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0",
  //   },
  //   {
  //     title: "chatGPT stuff",
  //     author: "ahmed",
  //     createdAt: "3 days ago",
  //     content: "content of the blog, this blog is interesting indeed",
  //     summary:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus eum perspiciatis similique incidunt quae placeat. Quas impedit dolor iusto sint.",
  //     likes: 40,
  //     imgUrl:
  //       "https://investingnews.com/media-library/image-of-hand-holding-an-ai-face-looking-at-the-words-chatgpt-openai.jpg?id=32871272&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0",
  //   },
  // ];
  return <StyledBlogs>
    <h3>Blogs</h3>
    {blogs?.map((blog, index) => <BlogItem key={index} blog={blog}/>)}
  </StyledBlogs>;
};

const StyledBlogs = styled.div`
  
  display: flex;
  flex-direction: column;
  gap: 1rem;
 
`;

export default Blogs;
