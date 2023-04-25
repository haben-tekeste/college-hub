import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    applications: [],
    filteredApplications: [],
    filter: "all",
    searchQuery: "",
}

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setApplications: (state, action) => {
            state.applications = action.payload
            state.filteredApplications = state.applications
        },
        filterApplications: (state, action) => {
            state.filter = action.payload;

            if(state.filter === "all"){
                state.filteredApplications = state.applications;
                return;
            }
            state.filteredApplications = state.applications.filter((application)=>
                application.status === state.filter
            )
        },
        searchApplications: (state, action) => {
            state.searchQuery = action.payload
            state.filteredApplications = state.applications.filter((application) => {
                // for(let i in Object.values(application)){
                //     if (i.includes(state.searchQuery))
                //         return application
                // }
                if (application.topic.toLowerCase().includes(state.searchQuery.toLowerCase()))
                        return application
                return false
            })

        }
    }
})

export const {setApplications, filterApplications, searchApplications} = applicationSlice.actions;
export default applicationSlice.reducer