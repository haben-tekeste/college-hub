import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// First, create the thunk
export const askOpenai = createAsyncThunk(
  "answer-details/askOpenai",
  (question) => {
    axios
      .post("http://localhost:3300/question", { question })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });

  }
);

const initialState = {
  question: {},
  openaiResponse: [],
  isLoading: false,
};

// Then, handle actions in your reducers:
const answerDetailsSlice = createSlice({
  name: "answer-details",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
        state.question = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(askOpenai.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(askOpenai.fulfilled, (state, action) => {
      state.isLoading = false;
      state.openaiResponse = action.payload;
    });
    builder.addCase(askOpenai.rejected, (state) => {
      state.isLoading = false;
      state.openaiResponse = [];
      console.log("Fetching error!");
    });
  },
});

export const {setQuestion} = answerDetailsSlice.actions;
export default answerDetailsSlice.reducer
