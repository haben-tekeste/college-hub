import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setProjectDetails } from "../states/projectDetails";
import { fetchProjectFeed } from "../Actions/projectActions";

// components
import SearchBar from "../components/SearchBar";
import Projects from "../components/Projects";
// import ProjectDetails from "../components/pop-ups/ProjectDetails";

//demo
import { projectData } from "../data/projectData";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const {loading, error, projects} = useSelector(state => state.project)

  const showProjectDetails = (project) => {
    console.log("working");
    dispatch(setProjectDetails(project));
    navigate(`/projects/${project.projectId}`);
  };
  // const popup = useSelector((state) => state.project.popup)

  // useEffect(() => {
  //     dispatch(fetchProjectFeed())
  // },[dispatch])

  return (
    <StyledProjectPage>
      <div className="search">
        <SearchBar className="searchbar" />
        <div className="flex">
          <button
            className="light-btn"
            onClick={() => navigate("/applications")}
          >
            My Applications
          </button>
          <button
            className="purple-btn"
            onClick={() => navigate("/create-project")}
          >
            + Create Project
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="container container-md">
          <h3>My Projects</h3>
          <table>
            <tr>
              <th>Projects</th>
              <th>Applicant</th>
              <th>Action</th>
            </tr>
            {projectData.map((project, index) => (
              <tr key={index}>
                <td>{project.topic}</td>
                <td>
                  <h6>{project.applicants.length}</h6>
                </td>
                <td>
                  <button
                    className="purple-btn"
                    onClick={() => showProjectDetails(project)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="container container-md">
          <Projects />
        </div>
      </div>
    </StyledProjectPage>
  );
};

const StyledProjectPage = styled.div`
  padding: 2rem;
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  .container {
    flex: 1;
    height: 80vh;
  }
  td button {
    display: block;
    font-size: 10px;
  }
  h3 {
    margin-bottom: 2rem;
  }

  table {
    width: 100%;
    th {
      text-align: left;
    }
    td,
    th {
      padding: 1rem;
    }
    h6 {
      font-size: 2rem;
    }
  }
`;
export default ProjectPage;
