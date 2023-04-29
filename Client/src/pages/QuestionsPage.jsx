import React, { useEffect } from "react";
// components
import QuestionItem from "../components/QuestionItem";
import SearchBar from "../components/SearchBar";
import AskQuestion from "../components/pop-ups/AskQuestion";
//styles
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, toggleAsk } from "../states/questions";

// demo data
import { questionData } from "../data/questionData";
import { fetchQuestionFeed } from "../Actions/questionActions";
import Spinner from "../components/Spinner";
import Loading from "../components/Loading";

const QuestionsPage = () => {
  const dispatch = useDispatch();

  const { loading, error, questions } = useSelector((state) => state.questions);

  useEffect(() => {
    // dispatch(setQuestions(questionData));
    dispatch(fetchQuestionFeed());
  }, [dispatch]);

  const { filteredQuestions, filter, askQuestion } = useSelector(
    (state) => state.questions
  );

  if (loading) return <Loading />;
  return (
    <StyledQuestions>
      {askQuestion && <AskQuestion />}
      <header className="flex">
        <h1>All Questions</h1>
        <div className="flex">
          <SearchBar />
          <button onClick={() => dispatch(toggleAsk())} className="purple-btn">
            Ask Question
          </button>
        </div>
      </header>
      <div className="questions container">
        <div className="filters flex">
          <h2>
            <span>{questions?.length}</span> - Questions
          </h2>
          <nav className="flex">
            <button className={filter === "" ? "purple-btn" : ""}>New</button>
            <button className={filter === "highest" ? "purple-btn" : ""}>
              Highest vote
            </button>
            <button className={filter === "answered" ? "purple-btn" : ""}>
              Answered
            </button>
            <button className={filter === "Not Answered" ? "purple-btn" : ""}>
              Not Answered
            </button>
          </nav>
        </div>
        {questions?.map((question, id) => (
          <QuestionItem question={question} key={id} />
        ))}
      </div>
    </StyledQuestions>
  );
};

export const StyledQuestions = styled.div`
  padding: 2rem;
  width: 100%;
  header {
    width: 100%;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  .container {
    width: 100%;
    height: 85vh;
    padding: 2rem;
  }
  .filters {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 3rem;
  }
`;
export default QuestionsPage;
