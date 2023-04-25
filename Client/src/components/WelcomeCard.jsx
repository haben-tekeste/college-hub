import React from "react";

//styled components
import { StyledCard } from "../styles/profilePageStyles";

//images
import profileStudying from "../images/profile-studying.jpg";


const WelcomeCard = () => {
  return (
    <>
      <StyledCard className="flex">
          <h1>
            Welcome Back, <br /><span>Ashley</span>
          </h1>
        <img src={profileStudying} alt="" />
      </StyledCard>
    </>
  );
};

export default WelcomeCard;
