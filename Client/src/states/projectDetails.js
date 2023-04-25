import { createSlice } from "@reduxjs/toolkit";

const projectDetailsSlice = createSlice({
  name: "project details",
  initialState: {
    details: [],
    filteredApplicants: [],
    filter: "all",
  },
  reducers: {
    setProjectDetails: (state, action) => {
      state.details = action.payload;
    },
    filterApplicants: (state, action) => {
      state.filter = action.payload;
      if (state.filter === "all") {
        state.filteredApplicants = state.details?.applicants;
        return;
      }
      state.filteredApplicants = state.details?.applicants.filter(
        (applicant) => applicant.status === state.filter
      );
    },
  },
});

export const { setProjectDetails, filterApplicants } =
  projectDetailsSlice.actions;
export default projectDetailsSlice.reducer;
