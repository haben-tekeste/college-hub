import React from "react";
import { useNavigate } from "react-router-dom";

import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";

// redux
import { useDispatch } from "react-redux";
import { toggleAsk } from "../../states/questions";
//icons
import { AiOutlineClose } from "react-icons/ai";

const AskQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <form className="flex-col">
          <input id="title" type="text" placeholder="Project title" />
          <input id="tags" type="text" placeholder="Tag separated by comma" />
          <textarea
            rows={7}
            id="description"
            type="text"
            placeholder="Question description"
          />
          <button className="purple-btn">Ask</button>
        </form>
      </div>
    </StyledAsk>
  );
};

const StyledAsk = styled(StyledPopup)`
    .container{
        min-width: 40vw;
        height: fit-content !important;
        overflow: hidden;
    }
    form *{
        width: 100%;
    }
    form{
        margin-top: 2rem;
    }
    
`

export default AskQuestion;
