import { useEffect, useState } from "react";
// components
import QuestionItem from "../components/QuestionItem";
import AskQuestion from "../components/pop-ups/AskQuestion";
//styles
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { toggleAsk } from "../states/questions";
import { StyledSearch } from "../components/SearchBar";
import { clearSearch } from "../states/questions";

//
import { fetchQuestionFeed, searchQuestion } from "../Actions/questionActions";
import Loading from "../components/Loading";
// icons
import { AiOutlineSearch } from "react-icons/ai";

const QuestionsPage = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const { loading, questions, filter, askQuestion, searchQuestions } =
    useSelector((state) => state.questions);

  const searchTerm = (e) => {
    e.preventDefault();
    dispatch(searchQuestion(term));
  };

  useEffect(() => {
    dispatch(fetchQuestionFeed());
  }, [dispatch]);

  if (loading) return <Loading />;
  return (
    <StyledQuestions>
      {askQuestion && <AskQuestion />}
      <header className="flex">
        <h1>All Questions</h1>
        <div className="flex">
          <StyledSearch onSubmit={(e) => searchTerm(e)}>
            <input
              type="text"
              placeholder="search..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch />
            </button>
          </StyledSearch>
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
            {searchQuestions.length != 0 && (
              <button
                onClick={() => {
                  dispatch(clearSearch());
                  setTerm("");
                }}
              >
                Clear Search
              </button>
            )}
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
        {searchQuestions.length &&
          searchQuestions?.map((question, i) => {
            return <QuestionItem question={question?._source} key={i} />;
          })}
        {!searchQuestions.length &&
          questions?.map((question, id) => (
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
