import React from "react";

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

const ProfilePage = () => {
  return (
    <StyledProfile>
      <div className="welcome-card">
        <SearchBar />
        <WelcomeCard />
      </div>
      <Stats className="stats" />
      <Badges className="badges"/>
      <div className="blogs container">
        <Blogs/>
      </div>
      <div className="projects container">
        <Projects/>
      </div>
      <div className="users container">
        <SuggestedUsers/>
      </div>
    </StyledProfile>
  );
};

export default ProfilePage;
