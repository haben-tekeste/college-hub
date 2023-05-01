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
import { fetchBooks } from "../Actions/bookActions";

const BooksPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("books");
    dispatch(fetchBooks());
  }, [dispatch]);

  const { books, loading } = useSelector((state) => state.books);

  if (loading) return <Loading />;
  return (
    <StyledBooksPage>
      <header>
        <SearchBar />
      </header>
      <div className="container">
        <h2>Available Books</h2>
        <div className="books">
          {books?.books?.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </div>
    </StyledBooksPage>
  );
};

export const StyledBooksPage = styled.div`
  padding: 2rem;
  width: 100%;
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
`;
export default BooksPage;
