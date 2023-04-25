import React from "react";

// styles
import { StyledQuestions } from "./QuestionsPage";
import styled from "styled-components";
// redux
import { useSelector, useDispatch } from "react-redux";

// router
import { useNavigate } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

//components
import ProfileComponent from "../components/ProfileComponent";
import AnswerItem from "../components/AnswerItem";
import AnsweredQuestion from "../components/AnsweredQuestion";
import OpenaiResponse from "../components/OpenaiResponse";

const Answer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { question } = useSelector((state) => state.answerDetails);

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
          <OpenaiResponse />
        </div>

        {/* Answers */}
        <div className="row flex">
          <div className="flex-col answers">
            <h3>{question.answers.length} Answers</h3>
            {question.answers.map((answer, index) => (
              <AnswerItem key={index} answer={answer} />
            ))}
          </div>
          <form className="flex-col">
            <textarea name="" id="" rows="12" placeholder="Your Answer..."></textarea>
            <button className="purple-btn">Submit</button>
          </form>
        </div>
      </div>
    </StyledAnswer>
  );
};

const StyledAnswer = styled(StyledQuestions)`
  h1 {
    margin-bottom: 2.5rem;
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
    form{
      flex: 1;
textarea{
  width: 100%;
}
button{
  align-self: flex-end;
}
    }
    .answers{
      flex: 1;
      height: 40vh;
      overflow-y: scroll;
    }
  }
`;
export default Answer;
