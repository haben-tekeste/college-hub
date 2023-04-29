import React, { useState, useEffect, useRef } from "react";

// styles
import { StyledQuestions } from "./QuestionsPage";
import styled from "styled-components";
// redux
import { useSelector, useDispatch } from "react-redux";

// router
import { useNavigate } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";
import Spinner from "../components/Spinner";
import Loading from "../components/Loading";

import axios from "axios";

//components
import ProfileComponent from "../components/ProfileComponent";
import AnswerItem from "../components/AnswerItem";
import AnsweredQuestion from "../components/AnsweredQuestion";
import OpenaiResponse from "../components/OpenaiResponse";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Answer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const initialized = useRef(false);

  const { question } = useSelector((state) => state.answerDetails);

  const notify = () => {
    toast.success("Answer created succesfully", {
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

  const submitAnswer = async (e) => {
    console.log("work");
    e.preventDefault();
    setError("");
    try {
      await axios.post("https://studenthub.dev/api/answers", {
        content: answer,
        questionId: questionData.id,
      });
      notify();
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors);
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await axios.get(
          `https://studentHub.dev/api/questionfeed/${question.id}`
        );
        setQuestionData(data.question);
        setAiAnswer(data.answer);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    if (!initialized.current) {
      initialized.current = true;
      fetchQuestion();
    }
  }, []);
  if (loading) return <Loading />;
  return (
    <StyledAnswer>
      <h1>
        Question <span>#{question.id}</span>
      </h1>
      <div className="container">
        <h2 className="flex back" onClick={() => navigate("/questions")}>
          <BiArrowBack /> Back
        </h2>
        <div className="flex row">
          <AnsweredQuestion question={question} />
          <OpenaiResponse answer={aiAnswer} />
        </div>

        {/* Answers */}
        <div className="row flex">
          <div className="flex-col answers">
            <h3>{question.answers.length} Answers</h3>
            {question.answers.map((answer, index) => (
              <AnswerItem key={index} answer={answer} />
            ))}
          </div>
          <form className="flex-col" onSubmit={submitAnswer}>
            <textarea
              name=""
              id=""
              rows="12"
              placeholder="Your Answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <button className="purple-btn" type="submit">
              Submit
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
          </form>
        </div>
      </div>
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
    </StyledAnswer>
  );
};

const StyledAnswer = styled(StyledQuestions)`
  h1 {
    margin-bottom: 2.5rem;
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
  }
  h2.back {
    transition: color 0.5s ease;
    color: var(--primary);
    cursor: pointer;
    &:hover {
      color: var(--secondary);
    }
  }
  .question {
    border-bottom: 2px solid var(--darkgrey);
    padding: 2rem 0rem;
    margin-bottom: 2rem;
  }
  .row {
    align-items: flex-start;
    gap: 2.5rem;
    form {
      flex: 1;
      textarea {
        width: 100%;
      }
      button {
        align-self: flex-end;
      }
    }
    .answers {
      flex: 1;
      height: 40vh;
      overflow-y: scroll;
    }
  }
`;
export default Answer;
