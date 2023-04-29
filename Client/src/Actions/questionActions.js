import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "https://studenthub.dev/api/questionfeed";

export const fetchQuestionFeed = createAsyncThunk(
  "question/feed",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendURL);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
