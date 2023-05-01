import React, { useEffect, useState } from "react";
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

//
import axios from "axios";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "../../utils/date";

const ApplyProject = () => {
  const navigate = useNavigate();
  const { details } = useSelector((state) => state.projectDetails);
  const [error, setError] = useState("");

  const notify = () => {
    toast.success("Application was succesfull", {
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
    setError("");
    try {
      await axios.post("https://studenthub.dev/api/applications", {
        projectId: details.id,
      });
      notify();
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors);
    }
  };

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
            <ProfileComponent name={details.postedBy.uname} />
            <h3>{details.topic.toUpperCase()}</h3>
            <p>{details.description}</p>
            <h3>Required skill set:</h3>
            <ul className="skills">
              {details.skillSet.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
            <h3>
              Deadline: <span>{formatDate(new Date(details.deadline))}</span>
            </h3>
          </div>
          <div className="flex-col">
            <h3>
              Project ID: <br /> <span>{details.id}</span>
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
            <Uploader />
          </div>
        </div>
        <button className="purple-btn" onClick={submitHandler}>
          Apply
        </button>
        {error && (
          <div className="alert alert-danger" style={{ marginTop: "1rem" }}>
            <h4>Ooops....</h4>
            <ul className="my-0">
              {error.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}
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
      </div>
    </StyledApply>
  );
};

const StyledApply = styled(StyledPopup)`
  .purple-btn {
    width: 100%;
    margin-top: 2rem;
  }
  .alert {
    color: white;
    background-color: #f77c86;
    border-color: #d6e9c6;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    width: 20rem;
    margin: 0 auto;
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
    .skills {
      margin-left: 2rem;
    }
  }
`;
export default ApplyProject;
