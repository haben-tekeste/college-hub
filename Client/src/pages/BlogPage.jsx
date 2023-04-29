import { useEffect } from "react";
// components
import Blogs from "../components/Blogs";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

// popup
import CreatePost from "../components/pop-ups/CreatePost";

// redux
import { useSelector, useDispatch } from "react-redux";
import { toggleCreatePost } from "../states/blogs";
import { fetchBlogFeed, fetchMyBlogs } from "../Actions/blogActions";

// styles
import styled from "styled-components";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { isCreatePost } = useSelector((state) => state.blogs);

  const { loading, error, blogs, myBlogs } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(fetchBlogFeed());
    dispatch(fetchMyBlogs());
  }, [dispatch]);

  if (loading) return <Spinner />;
  return (
    <StyledBlogPage>
      {isCreatePost && <CreatePost />}
      <header>
        <SearchBar></SearchBar>
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
          {blogs.length ? <Blogs blogs={blogs} /> : <h3>No blogs found</h3>}
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
