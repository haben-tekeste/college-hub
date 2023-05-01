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
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMyBlogs = createAsyncThunk(
  "blog/my",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/myblogs`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchBlog = createAsyncThunk(
  "blog/search",
  async ( term , { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendURL}/search`, { term });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
