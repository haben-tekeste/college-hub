import { createSlice } from "@reduxjs/toolkit";
import {
  fetchApplicationByProject,
  fetchMyApplications,
} from "../Actions/applicationActions";

const initialState = {
  applications: [],
  filteredApplications: [],
  filter: "all",
  searchQuery: "",
  loading: false,
  error: false,
  myApplications: [],
  projectApplications: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
      state.filteredApplications = state.applications;
    },
    filterApplications: (state, action) => {
      state.filter = action.payload;

      if (state.filter === "all") {
        state.filteredApplications = state.applications;
        return;
      }
      state.filteredApplications = state.applications.filter(
        (application) => application.status === state.filter
      );
    },
    searchApplications: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredApplications = state.applications.filter((application) => {
        // for(let i in Object.values(application)){
        //     if (i.includes(state.searchQuery))
        //         return application
        // }
        if (
          application.topic
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase())
        )
          return application;
        return false;
      });
    },
  },
  extraReducers: {
    // Fetch My Applications
    [fetchMyApplications.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMyApplications.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.myApplications = payload;
    },
    [fetchMyApplications.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
    // Fetch My Applications
    [fetchApplicationByProject.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchApplicationByProject.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.projectApplications = payload;
    },
    [fetchApplicationByProject.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
  },
});

export const { setApplications, filterApplications, searchApplications } =
  applicationSlice.actions;
export default applicationSlice.reducer;
