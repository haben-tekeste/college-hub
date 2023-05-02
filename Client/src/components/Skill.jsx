import styled from "styled-components";

import { AiFillStar } from "react-icons/ai";

const Skill = ({ skill }) => {
  let stars = [];
  let i = 0;
  for (i; i < skill.score; i++) stars.push(<AiFillStar fill="orange" />);
  for (i; i < 5; i++) stars.push(<AiFillStar fill="darkgrey" />);
  return (
    <StyledSkill className="flex">
      <h3>{skill?.name}</h3>
      <div className="flex">{stars.map((star) => star)}</div>
    </StyledSkill>
  );
};

const StyledSkill = styled.div`
  padding: 1rem;
  .flex {
    gap: 5px;
  }
`;
export default Skill;
