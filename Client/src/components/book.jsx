//styles
import styled from "styled-components";

//icons
import { BsFillPenFill, BsHandThumbsUpFill } from "react-icons/bs";

// redux
import { useDispatch } from "react-redux";
import { setDetails } from "../states/bookDetails";

//router
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Book = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const detailHandler = () => {
    dispatch(setDetails(book));
    navigate(`/books/${book.id}`)
  }
  return (
    <StyledBook className="flex-col">
      <div className="image" onClick={detailHandler}>
        <img src={book.coverImageUrl} alt={book.title} />
      </div>
      <h3 className="flex">{book.title}</h3>
      <h4 className="flex">
        {" "}
        <BsFillPenFill /> by: {book.author}
      </h4>
      <h4 className="flex">
        <BsHandThumbsUpFill /> {book.likes.length}
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
