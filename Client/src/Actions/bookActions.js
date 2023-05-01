import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "https://studenthub.dev/api/query";

export const fetchBooks = createAsyncThunk(
  "book/feed",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/home`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBook = createAsyncThunk(
  "book/bookDetail",
  async ({ bookId }, { rejectWithValue }) => {
    try {
      console.log(bookId);
      const { data } = await axios.get(`${backendURL}/${bookId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
