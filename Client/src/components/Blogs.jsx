import React from "react";
import styled from "styled-components";

//components
import BlogItem from "./BlogItem";

const Blogs = ({blogs}) => {
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
