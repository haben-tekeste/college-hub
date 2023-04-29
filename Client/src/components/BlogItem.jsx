import React from "react";
import styled from "styled-components";

import ProfileComponent from "./ProfileComponent";

import { formatDate } from "../utils/date";

const BlogItem = ({ blog }) => {
  return (
    <StyledBlogItem>
      <div className="flex">
        <ProfileComponent name={blog.author.uname} />
        <h6>Posted {formatDate(new Date(blog.createdAt))}</h6>
      </div>
      <p>{blog.content}</p>
      <img src={blog.imgUrl} alt={blog.author} />
      <p>{blog.summary}</p>
    </StyledBlogItem>
  );
};

const StyledBlogItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 28vw;
  h6 {
    min-width: fit-content;
  }
`;
export default BlogItem;
