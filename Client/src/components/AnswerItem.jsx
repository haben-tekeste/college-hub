import React, { useState } from "react";

import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import axios from "axios";
//components
import ProfileComponent from "./ProfileComponent";

const AnswerItem = ({ answer }) => {
  const [error, setError] = useState("");

  const upvote = async () => {
    try {
      await axios.post(
        "https://studenthub.dev/api/answers/upvote/" + answer.id
      );
    } catch (error) {
      setError(error.response.data);
    }
  };
  const downvote = async () => {
    try {
      await axios.post(
        "https://studenthub.dev/api/answers/downvote/" + answer.id
      );
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className="flex-col">
      <ProfileComponent name={answer.author.uname} />
      <div className="flex">
        <h3 className="flex-col">
          <AiOutlineCaretUp fill="var(--primary)" onClick={upvote} />
          {answer.upvotes.quantity + answer.downvotes.quantity}
          <AiOutlineCaretDown fill="var(--primary)" onClick={downvote} />
        </h3>
        <p>{answer.content}</p>
      </div>
      {error && (
        <div className="alert alert-danger" style={{ marginTop: "1rem" }}>
          <h4>Ooops....</h4>
          <ul className="my-0">
            {error.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnswerItem;
