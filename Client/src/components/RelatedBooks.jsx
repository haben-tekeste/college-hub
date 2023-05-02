import { useEffect } from "react";

import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setRelatedBooks } from "../states/bookDetails";
//components
import Book from "./book";

//router
import { Link, useNavigate } from "react-router-dom";

// data
import { bookData } from "../data/BookData";

const RelatedBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { relatedBooks } = useSelector((state) => state.bookDetails);

  return (
    <StyledRelatedBooks>
      <h3>Related Books</h3>
      <div className="flex-col">
        {relatedBooks.map((book) => (
          <Link
            to={`/books/${book.id}`}
            key={book.id}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Book key={book.id} book={book} />
          </Link>
        ))}
      </div>
    </StyledRelatedBooks>
  );
};

const StyledRelatedBooks = styled.div`
  flex: 0.5;
  background: var(--lightgrey);
  height: 70vh;
  overflow-y: scroll;
  padding: 1rem;
  border-radius: 10px;
  h3 {
    margin-bottom: 1rem;
  }
`;

export default RelatedBooks;
