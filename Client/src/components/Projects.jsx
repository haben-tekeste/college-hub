import React from "react";
import ProjectItem from "./ProjectItem";
import {projectData} from "../data/projectData"


const Projects = ({projects}) => {
  
  return (
    <div>
      <h3>Projects</h3>
      {projects?.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </div>
  );
};

export default Projects;
