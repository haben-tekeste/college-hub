import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  filter: "",
  filteredQuestions: [],
  askQuestion: false
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
});

export const {setQuestions, filterQuestions, toggleAsk} = questionsSlice.actions
export default questionsSlice.reducer
