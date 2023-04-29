import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "https://studenthub.dev/api/blogFeed";

export const fetchBlogFeed = createAsyncThunk(
  "blog/feed",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendURL);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMyBlogs = createAsyncThunk(
  "blog/my",
  async (_, { rejectWithValue }) => {
    try {
      console.log("first");
      const { data } = await axios.get(`${backendURL}/myblogs`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
