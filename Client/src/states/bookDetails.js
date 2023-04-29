import { createSlice } from "@reduxjs/toolkit";

const bookDetailsSlice = createSlice({
  name: "book-details",
  initialState: {
    details: {},
    relatedBooks: [],
    isBid: false,
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
});

export const { setDetails, setRelatedBooks, toggleIsBid } = bookDetailsSlice.actions;
export default bookDetailsSlice.reducer;