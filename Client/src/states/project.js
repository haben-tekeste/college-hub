import { createSlice } from "@reduxjs/toolkit";
import { fetchProjectFeed } from "../Actions/projectActions";

const initialState = {
  projects: [],
  error: null,
  loading: false,
  success: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearErrors: (state, { payload }) => {
      state.error = null;
    },
  },
  extraReducers: {
    // Fetch Projects
    [fetchProjectFeed.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchProjectFeed.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.projects = payload;
    },
    [fetchProjectFeed.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
  },
});

export const { toggleProjectDetails } = projectSlice.actions;
export default projectSlice.reducer;
