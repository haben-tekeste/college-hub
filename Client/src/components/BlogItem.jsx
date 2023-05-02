import React from "react";
import styled from "styled-components";

import ProfileComponent from "./ProfileComponent";

import { formatDate } from "../utils/date";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  return (
    <StyledBlogItem>
      <Link to={"/#"} style={{ textDecoration: "none" }}>
        <div className="flex">
          <ProfileComponent name={blog.author.uname} id={blog.author.id} />
          <h6>Posted {formatDate(new Date(blog.createdAt))}</h6>
        </div>{" "}
        <h3 style={{ marginTop: "1rem" }}>{blog.title}</h3>
      </Link>
      <div className="flex info">
        <div className="flex">
          {blog.tags?.map((tag, i) => (
            <button key={i} className="tag-btn">
              {tag}
            </button>
          ))}
        </div>
      </div>
      <p>{blog.summary}</p>
      {/* <p>{blog.content}</p> */}
      <img src={blog.imgUrl} alt={blog.author} />
    </StyledBlogItem>
  );
};

export const StyledBlogItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 28vw;
  h6 {
    min-width: fit-content;
  }
`;
export default BlogItem;
