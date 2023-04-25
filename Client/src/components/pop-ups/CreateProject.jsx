import React from "react";
import { useNavigate } from "react-router-dom";

import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";
//icons
import { AiOutlineClose } from "react-icons/ai";

const CreateProject = () => {
  const navigate = useNavigate();
  return (
    <StyledPopup>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => navigate("/projects")}
        >
          <AiOutlineClose />
        </button>
        <h3>Create a Project</h3>
        <StyledForm>
            <input id="title" type="text" placeholder="Project title"/>
            <input id="skillSet" type="text" placeholder="Skill set separated by comma"/>
            <input id="tags" type="text" placeholder="Tag separated by comma"/>
            <input id="deadline" type="text" placeholder="Deadline"/>
            <textarea rows={7} id="description" type="text" placeholder="Project description"/>
            <button className="purple-btn">Create</button>
        </StyledForm>
      </div>
    </StyledPopup>
  );
};

export const StyledForm = styled.form`
    #title{
        grid-area: title;
    }
    #skillSet{
        grid-area: skill-set;
    }
    #tags{
        grid-area: tags;
    }
    #deadline{
        grid-area: deadline;
    }
    #description{
        grid-area: description;
    }
    .purple-btn{
        grid-area: button;
    }
    display: grid;
    grid-template-areas: "title skill-set" 
                         "tags deadline"
                         "description description"
                         "button button";
    gap: 1.5rem;
    margin-top: 5rem;
`

export default CreateProject;
