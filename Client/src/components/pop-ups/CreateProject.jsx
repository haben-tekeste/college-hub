import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";
//icons
import { AiOutlineClose } from "react-icons/ai";

//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProject = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [topic, setTopic] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [skillSet, setSkillSet] = useState("");

  const notify = () => {
    toast.success("Project created succesfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      await axios.post("https://studenthub.dev/api/projects/new", {
        topic,
        deadline,
        description,
        tags: tags.split(","),
        skillSet: skillSet.split(","),
      });
      notify();
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };
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
        <StyledForm onSubmit={submitHandler}>
          <input
            id="title"
            type="text"
            placeholder="Project title"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            id="skillSet"
            type="text"
            placeholder="Skill set separated by comma"
            value={skillSet}
            onChange={(e) => setSkillSet(e.target.value)}
          />
          <input
            id="tags"
            type="text"
            placeholder="Tag separated by comma"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            id="deadline"
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <textarea
            rows={7}
            id="description"
            type="text"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="purple-btn" type="submit">
            Create
          </button>
        </StyledForm>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {errors && (
          <div className="alert alert-danger" style={{ marginTop: "1rem" }}>
            <h4>Ooops....</h4>
            <ul className="my-0">
              {errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </StyledPopup>
  );
};

export const StyledForm = styled.form`
  #title {
    grid-area: title;
  }
  #skillSet {
    grid-area: skill-set;
  }
  #tags {
    grid-area: tags;
  }
  #deadline {
    grid-area: deadline;
  }
  #description {
    grid-area: description;
  }
  .purple-btn {
    grid-area: button;
  }
  display: grid;
  grid-template-areas:
    "title skill-set"
    "tags deadline"
    "description description"
    "button button";
  gap: 1.5rem;
  margin-top: 5rem;
`;

export default CreateProject;
