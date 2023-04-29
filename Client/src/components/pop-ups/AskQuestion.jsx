// import { useNavigate } from "react-router-dom";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";
import { toggleAsk } from "../../states/questions";
//icons
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

const AskQuestion = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const notify = () => {
    toast.success("Question created succesfully", {
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
      await axios.post("https://studenthub.dev/api/questions", {
        title,
        content,
      });
      notify();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <StyledAsk>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => dispatch(toggleAsk())}
        >
          <AiOutlineClose />
        </button>
        <h3>Ask a Question</h3>
        <form className="flex-col" onSubmit={submitHandler}>
          <input
            id="title"
            type="text"
            placeholder="Question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input id="tags" type="text" placeholder="Tag separated by comma" />
          <textarea
            rows={7}
            id="description"
            type="text"
            placeholder="Question description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="purple-btn" type="submit">
            Ask
          </button>
        </form>
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
      </div>
    </StyledAsk>
  );
};

const StyledAsk = styled(StyledPopup)`
  .container {
    min-width: 40vw;
    height: fit-content !important;
    overflow: hidden;
  }
  form * {
    width: 100%;
  }
  form {
    margin-top: 2rem;
  }
`;

export default AskQuestion;
