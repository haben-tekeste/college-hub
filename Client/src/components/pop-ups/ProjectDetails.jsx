import React, {useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {filterApplicants} from "../../states/projectDetails"

import styled from "styled-components";

import { GoDesktopDownload,  } from "react-icons/go";
import {AiOutlineClose} from "react-icons/ai"

import Error from "../Error";


const ProjectDetails = () => {
  const project = useSelector((state) => state.projectDetails.details);
  const filteredApplicants = useSelector((state) => state.projectDetails.filteredApplicants);

  
  // using useNavigate to close the pop up and navigate back to teh projects page
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // removing the filters when the component is rendered for the first time
  useEffect(()=>{
    dispatch(filterApplicants("all"))
  },[])

  // filter handler
  const filterHandler = (e) => {
    dispatch(filterApplicants(e.target.value))
  }
  
  // rendering buttons based on the status of the applicant
  const renderAction = (status) => {
    if (status === "new")
      return (
        <div className="flex">
          <button className="light-btn">select</button>
          <button className="red-btn"> delete</button>
        </div>
      );
      else if (status === "selected")
      return <button className="red-btn"> delete</button>;
      else return <button className="light-btn">select</button>;
    };
    
    if (project.length === 0) return <Error/>;
  return (
    <StyledDetails>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => navigate("/projects")}
        >
          <AiOutlineClose />
        </button>
        <div className="project flex">
          <div className="flex-col">
            <h3>{project.topic.toUpperCase()}</h3>
            <p>{project.description}</p>
          </div>
          <div className="flex-col">
            <h3>
              Project ID: <br /> <span>{project.projectId}</span>
            </h3>
            <h3>Related to:</h3>
            <div className="tags">
              {project?.tags?.map((tag, index) => (
                <button key={index} className="tag-btn">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="purple-btn">Edit</button>
        <div className="applicants">
          <div className="flex">
            <h3>Applicants ({filteredApplicants?.length})</h3>
            <div className="filter">
              <label htmlFor="applicant">Filter by:</label>
              <select name="applicant" onChange={filterHandler}>
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="selected">Selected</option>
                <option value="not selected">Not Selected</option>
              </select>
            </div>
          </div>
          <table>
            <tr>
              <th>Applicant</th>
              <th>Status</th>
              <th>Attachement</th>
              <th>Actions</th>
            </tr>
            {filteredApplicants?.map((applicant, index) => (
              <tr key={index}>
                <td>{applicant.applicant}</td>
                <td>{applicant.status}</td>
                <td className="flex">
                  <GoDesktopDownload /> resume
                </td>
                <td>{renderAction(applicant.status)}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </StyledDetails>
  );
};

export const StyledDetails = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #00000059;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  .container {
    position: relative;
    width: 50vw;
    height: 70vh;
    .light-btn.close{
        background-color: transparent;
        border: none;
        font-size: 2rem;
        font-weight: bold;
        position: absolute;
        top: 0;
        right: 0;
    }
    .project {
      gap: 3rem;
      .tags {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
    }
    .purple-btn {
      margin: 2rem 0rem;
    }
    .applicants {
      background-color: var(--lightgrey);
      padding: 1rem;
      .flex {
        justify-content: space-between;
      }
      table {
        margin-top: 1.5rem;
        width: 100%;
        th {
          text-align: left;
        }
        td {
          padding: 1rem 0rem;
          h3 {
            color: var(--primary);
          }
          button {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }
        }
        td .flex, td.flex {
          justify-content: flex-start;
        }
      }
    }
  }
`;
export default ProjectDetails;
