import  {useEffect} from 'react'

import styled from 'styled-components'

//redux 
import { useSelector, useDispatch } from 'react-redux'
import { setRelatedBooks } from '../states/bookDetails'

//components
import Book from './book'

// data
import { bookData } from '../data/BookData'

const RelatedBooks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setRelatedBooks(bookData))
    }, [dispatch])

    const {relatedBooks} = useSelector(state => state.bookDetails)

  return (
    <StyledRelatedBooks>
        <h3>Related Books</h3>
        <div className="flex-col">
            {relatedBooks.map(book => <Book key={book.id} book={book}/>)}
        </div>
    </StyledRelatedBooks>
  )
}

const StyledRelatedBooks = styled.div`
    flex: 0.5;
    background: var(--lightgrey);
    height: 70vh;
    overflow-y: scroll;
    padding: 1rem;
    border-radius: 10px;
    h3{
        margin-bottom: 1rem;
    }
` 

export default RelatedBooks
