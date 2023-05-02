import React, { useEffect } from "react";

//styled components
import { StyledProfile } from "../styles/profilePageStyles";

//components
import WelcomeCard from "../components/WelcomeCard";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import Badges from "../components/Badges";
import Blogs from "../components/Blogs";
import Projects from "../components/Projects";
import SuggestedUsers from "../components/SuggestedUsers";

//redux
import { fetchBlogFeed } from "../Actions/blogActions";
import { fetchProjectFeed } from "../Actions/projectActions";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { loading, blogs } = useSelector((state) => state.blogs);
  const {
    loading: projectLoading,
    projects,
    myProjects,
  } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchBlogFeed());
    dispatch(fetchProjectFeed());
  }, [dispatch]);
  return (
    <StyledProfile>
      <div className="welcome-card">
        <SearchBar />
        <WelcomeCard />
      </div>
      <Stats className="stats" myProjects={myProjects} />
      <Badges className="badges" />
      <div className="blogs container">
        <Blogs blogs={blogs.slice(0, 4)} />
      </div>
      <div className="projects container">
        <Projects projects={projects.slice(0, 4)} />
      </div>
      <div className="users container">
        <SuggestedUsers />
      </div>
    </StyledProfile>
  );
};

export default ProfilePage;
