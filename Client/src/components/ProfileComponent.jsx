import styled from "styled-components";

const ProfileComponent = ({ name }) => {
  return (
    <StyledProfile className="flex">
      <div className="icon">{name?.charAt(0)}</div>
      <h4>{name}</h4>
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
