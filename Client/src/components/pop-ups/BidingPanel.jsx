import { StyledPopup } from "../../styles/PopupStyles";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { toggleIsBid } from "../../states/bookDetails";
import { clearError, setUserBooks } from "../../states/books";

//icons
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
//data
import { bookData } from "../../data/BookData";
import { useNavigate, useParams } from "react-router-dom";
import { bidBook } from "../../Actions/bookActions";
import CustomError from "../CustomError";
import Loading from "../Loading";
const BidingPanel = () => {
  const dispatch = useDispatch();
  const [bidderBook, setBidderBook] = useState();
  const param = useParams();
  // useEffect(() => {
  //   // dispatch(setUserBooks(bookData));
  // }, [dispatch]);
  const navigate = useNavigate();
  const { userBooks, error, loading, biddSuccess } = useSelector(
    (state) => state.books
  );
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  const submitBid = async (e) => {
    e.preventDefault();
    console.log("book", param.id);
    console.log("bidderBook", bidderBook);
    dispatch(bidBook({ bookId: param.id, bidderBook }));
    if (biddSuccess) navigate("/books");
  };
  if (loading) return <Loading />;
  return (
    <StyledAsk>
      <div className="container">
        <button
          className="light-btn close"
          onClick={() => dispatch(toggleIsBid())}
        >
          <AiOutlineClose />
        </button>
        <h3>Select one of your books to start biding</h3>
        <form className="flex-col" onSubmit={submitBid}>
          <div className="book-options">
            {userBooks.map((book, i) => (
              <div key={i}>
                <img src={book.coverImageUrl} alt={book.title} />
                <div className="flex">
                  <h3>{book.title}</h3>
                  <input
                    key={book.id}
                    name="biding-option"
                    type="radio"
                    value={book.id}
                    onChange={(e) => setBidderBook(e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="purple-btn">Bid</button>
        </form>
        {error && <CustomError err={error} />}
      </div>
    </StyledAsk>
  );
};

const StyledAsk = styled(StyledPopup)`
  .container {
    width: 40vw !important;
    height: fit-content !important;
    overflow: hidden;
  }
  form * {
    width: 100%;
  }
  form {
    margin-top: 2rem;
  }
  .book-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    height: 40vh;
    overflow-y: scroll;
    margin: 1rem 0rem;
  }
`;

export default BidingPanel;
