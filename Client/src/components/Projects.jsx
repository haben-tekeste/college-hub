import React from "react";
import ProjectItem from "./ProjectItem";
import {projectData} from "../data/projectData"


const Projects = () => {
  
  return (
    <div>
      <h3>Projects</h3>
      {projectData.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </div>
  );
};

export default Projects;
