import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBlogFeed,
  fetchMyBlogs,
  searchBlog,
} from "../Actions/blogActions";

const initialState = {
  isCreatePost: false,
  blogs: [],
  myBlogs: [],
  searchBlogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    toggleCreatePost: (state) => {
      state.isCreatePost = !state.isCreatePost;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearBlogSearch: (state) => {
      state.searchBlogs = [];
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
    // Search Blogs
    [searchBlog.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [searchBlog.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchBlogs = payload;
    },
    [searchBlog.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
  },
});

export const { toggleCreatePost, clearErrors, clearBlogSearch } =
  blogSlice.actions;
export default blogSlice.reducer;
