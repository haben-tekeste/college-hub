//styles
import styled from "styled-components";

import { Navigate } from "react-router-dom";

//icons
import { BsFillPenFill, BsHandThumbsUpFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { fetchBook } from "../Actions/bookActions";
// redux

//router
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setDetails } from "../states/bookDetails";

// eslint-disable-next-line react/prop-types
const Book = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailHandler = () => {
    setDetails(book);

    // dispatch(fetchBook({ bookId: param.id }));
    navigate(`/books/${book.id}`);
  };
  return (
    <StyledBook className="flex-col" onClick={detailHandler}>
      <div className="image">
        <img src={book.coverImageUrl} alt={book.title} />
      </div>
      <h3 className="flex">{book.title}</h3>
      <h4 className="flex">
        {" "}
        <BsFillPenFill /> by: {book.author}
      </h4>
      <h4 className="flex">
        {/* <BsHandThumbsUpFill /> {book.likes.length} */}
      </h4>
    </StyledBook>
  );
};

const StyledBook = styled.div`
  border: 1px solid var(--darkgrey);
  padding: 1rem;
  h3 {
    font-size: 1.5rem;
  }
  border-radius: 10px;
  .image {
    cursor: pointer;
    margin-bottom: 1rem;
  }
`;
export default Book;
