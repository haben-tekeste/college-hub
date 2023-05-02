import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { setProjectDetails } from "../states/projectDetails";

//components
import ProfileComponent from "./ProfileComponent";

const ProjectItem = ({ project }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewProject = () => {
    dispatch(setProjectDetails(project));
    navigate(`/projects/apply/${project.id}`);
  };
  return (
    <StyledProjectItem>
      <div className="flex">
        <ProfileComponent
          name={project.postedBy.uname}
          id={project.postedBy.id}
        ></ProfileComponent>
        <h6 onClick={viewProject}>View Project</h6>
      </div>
      <h4>{project.topic}</h4>
      <p>{project.description}</p>
      <h4>Related to:</h4>
      <div className="grid">
        {project.tags.map((tag, index) => (
          <button key={index} className="tag-btn">
            {tag}
          </button>
        ))}
      </div>
    </StyledProjectItem>
  );
};

const StyledProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0rem;
  h6 {
    min-width: fit-content;
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.5s ease;
    &:hover {
      color: var(--darkgrey);
    }
  }
  h4 {
    font-size: 1rem;
    font-weight: bold;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
`;

export default ProjectItem;
