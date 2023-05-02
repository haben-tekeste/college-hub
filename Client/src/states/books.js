import { createSlice } from "@reduxjs/toolkit";
import {
  bidBook,
  createBook,
  fetchBooks,
  fetchMyBooks,
} from "../Actions/bookActions";
import { showBids } from "../Actions/bookActions";

const initialState = {
  books: [],
  userBooks: [],
  biddSuccess: false,
  loading: false,
  error: null,
  isShareBook: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setUserBooks: (state, action) => {
      state.userBooks = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
      state.biddSuccess = false;
    },
    toggleIsShareBook: (state) => {
      state.isShareBook = !state.isShareBook;
    },
    setBidingDetails: (state, action) => {
      state.bidingDetails = action.payload;
    },
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
      state.error = null;
    },
    [fetchBooks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
    [fetchMyBooks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMyBooks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userBooks = payload;
      state.error = null;
    },
    [fetchMyBooks.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
    [bidBook.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [bidBook.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.biddSuccess = true;
      state.error = null;
    },
    [bidBook.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
    [createBook.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createBook.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
  },
});

export const {
  setBooks,
  setUserBooks,
  clearError,
  toggleIsShareBook,
  setBidingDetails,
} = booksSlice.actions;
export default booksSlice.reducer;
