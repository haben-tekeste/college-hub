import { useEffect } from "react";

// components
import SearchBar from "../components/SearchBar";
import Book from "../components/book";
import Loading from "../components/Loading";

//redux
import { useSelector, useDispatch } from "react-redux";
// import { setBooks } from "../states/books";

//styles
import styled from "styled-components";

// demo
// import { bookData } from "../data/BookData";
import { fetchBooks, fetchMyBooks } from "../Actions/bookActions";
import { toggleIsShareBook } from "../states/books";
import { useNavigate, useLocation } from "react-router-dom";
import ShareBook from "../components/pop-ups/shareBook";
import MyBooks from "./MyBooks";
const BooksPage = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchMyBooks());
  }, [dispatch]);

  const { books, loading, isShareBook, userBooks } = useSelector(
    (state) => state.books
  );

  if (loading) return <Loading />;
  return (
    <StyledBooksPage>
      {isShareBook && <ShareBook />}
      <header className="flex">
        <SearchBar />
        <button
          className="light-btn"
          onClick={() => dispatch(toggleIsShareBook())}
        >
          Share a Book
        </button>
        <button
          onClick={() => navigate("/books/my-books")}
          className="purple-btn"
        >
          My Books
        </button>
      </header>
      {location === "/books/my-books" && <MyBooks books={userBooks} />}
      {location === "/books" && (
        <div className="container">
          <h2>Available Books</h2>
          <div className="books">
            {books?.books?.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </StyledBooksPage>
  );
};

export const StyledBooksPage = styled.div`
  padding: 2rem;
  width: 100% !important;
  header {
    gap: 3rem;
  }
  .container {
    margin-top: 2rem;
    height: 85vh;
    width: 100%;
  }
  .books {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }
  .back {
    cursor: pointer;
    color: var(--primary);
    transition: color 0.5s ease;
    margin-bottom: 3rem;
    &:hover {
      color: var(--secondary);
    }
  }
`;
export default BooksPage;
