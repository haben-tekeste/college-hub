import { createSlice } from "@reduxjs/toolkit";
import { fetchMyProjects, fetchProjectFeed } from "../Actions/projectActions";

const initialState = {
  projects: [],
  myProjects: [],
  error: null,
  loading: false,
  success: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearErrors: (state, {payload}) => {
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
    // Fetch My Projects
    [fetchMyProjects.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMyProjects.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.myProjects = payload;
    },
    [fetchMyProjects.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
  },
});

export const { toggleProjectDetails, clearErrors } = projectSlice.actions;
export default projectSlice.reducer;
