import styled from "styled-components";

const Experience = ({ experience }) => {
  return (
    <StyledExperience className="flex-col">
      <h2>{experience.title}</h2>
      <h4>{experience.company}</h4>
      <div className="flex">
        <h4 className="tag-btn">Duration: {experience.period} Years</h4>
        <h4>
          <span>{experience.isCurrentJob ? "Currently working here" : ""}</span>
        </h4>
      </div>
      <p>{experience.description}</p>
    </StyledExperience>
  );
};

const StyledExperience = styled.div`
  padding: 1.5rem;
  border-bottom: 2px solid var(--darkgrey);
`;

export default Experience;