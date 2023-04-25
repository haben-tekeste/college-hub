import React from "react";

//components
import ProfileComponent from "./ProfileComponent";

// styles
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";
import { setQuestion, askOpenai } from "../states/answerDetails";

// router
import { useNavigate } from "react-router-dom";

const QuestionItem = ({ question }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answerHandler = async () => {
    dispatch(setQuestion(question));

    // sending a request to open ai
    let questionPrompt = question.title + " " + question.content;
    await dispatch(askOpenai(questionPrompt));
    navigate(`/questions/${question.id}`);
  };
  return (
    <StyledQuestion className="flex">
      <div className="flex-col votes">
        <h4>{question.votes} Votes</h4>
        <h4>{question?.answers?.length} Answers</h4>
      </div>
      <div className="flex-col">
        <h2 onClick={answerHandler}>{question.title}</h2>
        <p>{question.content}</p>
        <div className="flex info">
          <div className="flex">
            {question.tags.map((tag) => (
              <button className="tag-btn">{tag}</button>
            ))}
          </div>
          <div className="flex">
            <ProfileComponent name={question.author} />
            <h4>{question.createdAt}</h4>
          </div>
        </div>
      </div>
    </StyledQuestion>
  );
};

const StyledQuestion = styled.div`
  gap: 5rem !important;
  border-bottom: 2px solid var(--darkgrey);
  padding: 1.5rem;
  h2 {
    transition: color 0.5s ease;
    cursor: pointer;
    &:hover {
      color: var(--primary);
    }
  }
  h4 {
    min-width: fit-content;
    font-weight: bold;
  }
  .votes {
    min-width: fit-content;
  }
  .info {
    width: 100%;
    justify-content: space-between;
  }
  .question{
    border-bottom: 2px solid var(--primary);
  }
`;

export default QuestionItem;
