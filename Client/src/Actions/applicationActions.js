import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "https://studenthub.dev/api/applications/myapplications";

export const fetchMyApplications = createAsyncThunk(
  "application/my",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendURL);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchApplicationByProject = createAsyncThunk(
  "application/project",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://studenthub.dev/api/applications/projects/${id}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
