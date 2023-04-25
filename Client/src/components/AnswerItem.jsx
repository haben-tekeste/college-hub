import React from 'react'

import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

//components
import ProfileComponent from "./ProfileComponent";

const AnswerItem = ({answer}) => {
  return (
    <div className="flex-col">
      <ProfileComponent name={answer.author} />
      <div className="flex">
        <h3 className="flex-col">
          <AiOutlineCaretUp fill="var(--primary)" />
          {answer.votes}
          <AiOutlineCaretDown fill="var(--primary)" />
        </h3>
        <p>{answer.content}</p>
      </div>
    </div>
  );
}

export default AnswerItem