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
      const { data } = await axios.get(`${backendURL}/${bookId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMyBooks = createAsyncThunk(
  "book/myBook",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/view-my-books`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bidBook = createAsyncThunk(
  "book/bidBook",
  async ({ bookId, bidderBook }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`https://studenthub.dev/api/bid`, {
        bookId,
        bidderBook,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const showBids = createAsyncThunk(
  "book/bidBooks",
  async ({ bookId }, { rejectWithValue }) => {
    try {
      console.log(bookId);
      const { data } = await axios.get(
        `https://studenthub.dev/api/bid/${bookId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveBid = createAsyncThunk(
  "book/approveBid",
  async ({ bidId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `https://studenthub.dev/api/bid/${bidId}`
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBook = createAsyncThunk(
  "book/createNewBook",
  async (
    { image, title, author, publishedDate, condition, description, genre },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        "https://studenthub.dev/api/booki/new-book",
        { image, title, author, publishedDate, condition, description, genre },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
