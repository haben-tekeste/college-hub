import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogFeed, fetchMyBlogs } from "../Actions/blogActions";

const initialState = {
    isCreatePost: false,
    blogs:[],
    myBlogs: [],
    loading:false,
    error: null
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers:{
        toggleCreatePost: (state) => {
            state.isCreatePost = !state.isCreatePost
        },
        clearErrors: (state, { payload }) => {
            state.error = null;
          },
    },
    extraReducers: {
        // Fetch Blogs
        [fetchBlogFeed.pending]: (state) => {
          state.loading = true;
          state.error = null;
        },
        [fetchBlogFeed.fulfilled]: (state, { payload }) => {
          state.loading = false;
          state.blogs = payload;
        },
        [fetchBlogFeed.rejected]: (state, { payload }) => {
          state.loading = false;
          state.error = payload.errors;
        },
        // Fetch My Blogs
        [fetchMyBlogs.pending]: (state) => {
          state.loading = true;
          state.error = null;
        },
        [fetchMyBlogs.fulfilled]: (state, { payload }) => {
          state.loading = false;
          state.myBlogs = payload;
        },
        [fetchMyBlogs.rejected]: (state, { payload }) => {
          state.loading = false;
          state.error = payload.errors;
        },
      },
})


export const {toggleCreatePost, clearErrors} = blogSlice.actions;
export default blogSlice.reducer