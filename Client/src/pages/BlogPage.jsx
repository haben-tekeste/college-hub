import { useEffect, useState } from "react";
// components
import Blogs from "../components/Blogs";
import Spinner from "../components/Spinner";

// popup
import CreatePost from "../components/pop-ups/CreatePost";

// redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreatePost, clearBlogSearch } from "../states/blogs";
import {
  fetchBlogFeed,
  fetchMyBlogs,
  searchBlog,
} from "../Actions/blogActions";

// styles
import styled from "styled-components";
import { StyledSearch } from "../components/SearchBar";
import { StyledBlogItem } from "../components/BlogItem";

// icons
import { AiOutlineSearch } from "react-icons/ai";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { isCreatePost } = useSelector((state) => state.blogs);

  const { loading, blogs, myBlogs, searchBlogs } = useSelector(
    (state) => state.blogs
  );

  const [term, setTerm] = useState("");

  const searchTerm = (e) => {
    e.preventDefault();
    try {
      dispatch(searchBlog(term));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchBlogFeed());
    dispatch(fetchMyBlogs());
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <StyledBlogPage>
      {isCreatePost && <CreatePost />}
      <header>
        <StyledSearch onSubmit={(e) => searchTerm(e)}>
          <input
            type="text"
            placeholder="search..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <AiOutlineSearch />
          </button>
        </StyledSearch>
        <button
          className="purple-btn"
          onClick={() => dispatch(toggleCreatePost())}
        >
          Create a Post
        </button>
      </header>
      <div className="flex blogs">
        <div className="container">
          {myBlogs.length ? (
            <Blogs blogs={myBlogs} />
          ) : (
            <h3 style={{ textAlign: "center" }}>
              You have not written blog yet
            </h3>
          )}
        </div>

        <div className="container">
          {searchBlogs.length ? (
            <div className="container">
              <div className="flex" style={{ justifyContent: "space-between" }}>
                <h2>Search Results</h2>
                <button onClick={() => dispatch(clearBlogSearch())}>
                  Clear Search
                </button>
              </div>
              {searchBlogs.map((blog, i) => (
                <StyledBlogItem key={i} style={{ marginTop: "2rem" }}>
                  <h3>{blog._source.title}</h3>
                  <p>{blog._source.summary}</p>
                </StyledBlogItem>
              ))}
            </div>
          ) : (
            <Blogs blogs={blogs} />
          )}
        </div>
      </div>
    </StyledBlogPage>
  );
};

const StyledBlogPage = styled.div`
  padding: 2rem;
  width: 100%;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  .blogs .container {
    flex: 1;
    height: 80vh;
    margin: 0 auto;
  }
`;
export default BlogPage;
