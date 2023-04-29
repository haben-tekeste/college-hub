import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


const backendURL = "https://studenthub.dev/api/projectfeed";

export const fetchProjectFeed = createAsyncThunk(
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


export const fetchMyProjects = createAsyncThunk(
  "project/my",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://studenthub.dev/api/applications");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
