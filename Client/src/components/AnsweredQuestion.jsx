import React from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

// styles
import styled from "styled-components";
const AnsweredQuestion = ({ question }) => {
  return (
    <StyledAnswer className="question flex-col">
      <h2>{question.title}</h2>
      <h4>{question.createdAt}</h4>
      <div className="flex">
        <h3 className="flex-col">
          <AiOutlineCaretUp fill="var(--primary)" />
          {question.votes}
          <AiOutlineCaretDown fill="var(--primary)" />
        </h3>
        <div className="flex-col">
          <p>{question.content}</p>
          <div className="flex">
            {question.tags.map((tag) => (
              <button className="tag-btn">{tag}</button>
            ))}
          </div>
        </div>
      </div>
    </StyledAnswer>
  );
};

const StyledAnswer = styled.div`
  flex: 1;
`;
export default AnsweredQuestion;
