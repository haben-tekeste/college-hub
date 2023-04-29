import {useEffect} from "react";

// components
import SearchBar from "../components/SearchBar";
import Book from "../components/book";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "../states/books";

//styles
import styled from "styled-components";

// demo
import { bookData } from "../data/BookData";

const BooksPage = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setBooks(bookData))
    }, [dispatch])

    const {books} = useSelector(state => state.books)

  return (
    <StyledBooksPage>
      <header>
        <SearchBar />
      </header>
      <div className="container">
        <h2>Available Books</h2>
        <div className="books">
            {books.map((book) => <Book key={book.id} book={book}/>)}
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
  .books{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }
`;
export default BooksPage;