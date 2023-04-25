import React from "react";
import { useNavigate } from "react-router-dom";
//icons
import { AiOutlineClose } from "react-icons/ai";

//redux
import { useSelector } from "react-redux";

// styled
import styled from "styled-components";
import { StyledPopup } from "../../styles/PopupStyles";

// components
import ProfileComponent from "../ProfileComponent";
import Uploader from "../Uploader";

const ApplyProject = () => {
  const navigate = useNavigate();
  const { details } = useSelector((state) => state.projectDetails);

  return (
    <StyledApply>
      <div className="container">
        <h3>Apply</h3>
        <button
          className="light-btn close"
          onClick={() => navigate("/projects")}
        >
          <AiOutlineClose />
        </button>
        <div className="project flex">
          <div className="flex-col">
            <ProfileComponent name={details.postedBy} />
            <h3>{details.topic.toUpperCase()}</h3>
            <p>{details.description}</p>
            <h3>Required skill set:</h3>
            <ul className="skills">
                {details.skillset.map(skill => <li>{skill}</li>)}
            </ul>
            <h3>Deadline: <span>{details.deadline}</span></h3>
          </div>
          <div className="flex-col">
            <h3>
              Project ID: <br /> <span>{details.projectId}</span>
            </h3>
            <h3>Related to:</h3>
            <div className="tags">
              {details?.tags?.map((tag, index) => (
                <button key={index} className="tag-btn">
                  {tag}
                </button>
              ))}
            </div>
            <h3> Upload Resume:</h3>
            <Uploader/>
          </div>
        </div>
        <button className="purple-btn">Apply</button>
      </div>
    </StyledApply>
  );
};

const StyledApply = styled(StyledPopup)`
    .purple-btn{
        width: 100%;
        margin-top: 2rem;
    }
  .project {
    align-items: flex-start;
    margin-top: 2rem;
    gap: 3rem;
    .tags {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .skills{
        margin-left: 2rem;
    }
  }
`;
export default ApplyProject;
