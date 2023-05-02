import styled from "styled-components";
import ProfilePopup from "./pop-ups/ProfilePopup";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileComponent = ({ name, id }) => {
  const [active, setActive] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handlePopup = () => {
    if (userInfo.username == name) return;
    setActive(!active);
  };

  return (
    <StyledProfile className="flex" onClick={handlePopup}>
      <div className={`icon color${Math.floor(Math.random() * 13)}`}>
        {name?.charAt(0)}
      </div>
      <h4>{name}</h4>
      {active && <ProfilePopup name={name} id={id} />}
    </StyledProfile>
  );
};
const generateColor = () => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return color;
};

const StyledProfile = styled.div`
  width: 100%;

  .icon {
    font-size: 1rem;
    padding: 1rem;
    border-radius: 50%;
    background-color: ${generateColor()};
    color: white;
  }
`;
export default ProfileComponent;
