import { useEffect, useState } from "react";
import axios from "axios";
//components
import Profile from "../../pages/Profile";

// styles
import styled from "styled-components";
import { StyledPopup } from "../../styles/PopupStyles";

const ProfilePopup = ({ name, id }) => {
  return (
    <StyledProfilePopup>
      <div className="container">
        <Profile name={name} id={id} />
      </div>
    </StyledProfilePopup>
  );
};

const StyledProfilePopup = styled(StyledPopup)`
  .container {
    width: 50vw;
    height: 70vh;
    padding: 1rem;
    background-color: var(--lightgrey);
    z-index: 99;
  }
`;
export default ProfilePopup;
