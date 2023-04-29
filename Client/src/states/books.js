import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "../Actions/bookActions";

const initialState = {
    books: [],
    userBooks: [],
    loading:false,
    error:null
}

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload
        },
        setUserBooks: (state, action) => {
            state.userBooks = action.payload
        }
    },
    extraReducers: {
        // Fetch Books
        [fetchBooks.pending]: (state) => {
          state.loading = true;
          state.error = null;
        },
        [fetchBooks.fulfilled]: (state, { payload }) => {
          state.loading = false;
          state.books = payload;
        },
        [fetchBooks.rejected]: (state, { payload }) => {
          state.loading = false;
          state.error = payload.errors;
        },
      },
})

export const {setBooks, setUserBooks} = booksSlice.actions;
export default booksSlice.reducer