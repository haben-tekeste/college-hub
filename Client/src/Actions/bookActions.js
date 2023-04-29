import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const backendURL = "https://studenthub.dev/api/query";

export const fetchBooks = createAsyncThunk(
  "project/feed",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendURL);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

