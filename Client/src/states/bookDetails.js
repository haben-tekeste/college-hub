import { createSlice } from "@reduxjs/toolkit";
import { fetchBook } from "../Actions/bookActions";
const bookDetailsSlice = createSlice({
  name: "book-details",
  initialState: {
    details: {},
    relatedBooks: [],
    isBid: false,
    loading: false,
  },
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setRelatedBooks: (state, action) => {
      state.relatedBooks = action.payload;
    },
    toggleIsBid: (state) => {
      state.isBid = !state.isBid;
    },
  },
  extraReducers: {
    // Fetch Books
    [fetchBook.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchBook.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.relatedBooks = payload.recommendedBooks;
      state.error = null;
    },
    [fetchBook.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
  },
});

export const { setDetails, setRelatedBooks, toggleIsBid } =
  bookDetailsSlice.actions;
export default bookDetailsSlice.reducer;
