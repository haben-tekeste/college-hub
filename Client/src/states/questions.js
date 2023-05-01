import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestionFeed, searchQuestion } from "../Actions/questionActions";

const initialState = {
  questions: [],
  filter: "",
  filteredQuestions: [],
  searchQuestions: [],
  askQuestion: false,
  loading: false,
  eror: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.filteredQuestions = action.payload;
    },
    filterQuestions: (state, action) => {
      state.filter = action.payload;
      if (state.filter === "") {
        state.filteredQuestions = state.questions;
        return;
      }
    },
    toggleAsk: (state) => {
      state.askQuestion = !state.askQuestion;
    },
    clearSearch: (state) => {
      state.searchQuestions = [];
    },
  },
  extraReducers: {
    // Fetch Questions
    [fetchQuestionFeed.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchQuestionFeed.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.questions = payload;
    },
    [fetchQuestionFeed.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
    // Search Questions
    [searchQuestion.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [searchQuestion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchQuestions = payload;
    },
    [searchQuestion.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
  },
});

export const { setQuestions, filterQuestions, toggleAsk, clearSearch } =
  questionsSlice.actions;
export default questionsSlice.reducer;
