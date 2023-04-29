import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestionFeed } from "../Actions/questionActions";

const initialState = {
  questions: [],
  filter: "",
  filteredQuestions: [],
  askQuestion: false,
  loadin:false,
  eror:null
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.filteredQuestions = action.payload
    },
    filterQuestions: (state, action) => {
      state.filter = action.payload;
      if (state.filter === "") {
        state.filteredQuestions = state.questions;
        return;
      }
      
    },
    toggleAsk: (state) => {
      state.askQuestion = !state.askQuestion
    }
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
  },
});

export const {setQuestions, filterQuestions, toggleAsk} = questionsSlice.actions
export default questionsSlice.reducer
