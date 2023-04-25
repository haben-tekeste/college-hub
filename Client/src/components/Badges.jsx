import React from "react";
import { StyledBadges } from "../styles/profilePageStyles";

// icons
// import { SiOpenbadges } from "react-icons/si";
// import { HiOutlineBadgeCheck } from "react-icons/hi";
const Badges = () => {
  return (
    <StyledBadges>
      <h3>Badges</h3>
      <div className="badges">
        <h4>You don't have badges yet...</h4>
      </div>
      {/* <h5>
        <SiOpenbadges /> Mentor
      </h5>
      <h5>
        <HiOutlineBadgeCheck /> Supporter
      </h5> */}
    </StyledBadges>
  );
};

export default Badges;
