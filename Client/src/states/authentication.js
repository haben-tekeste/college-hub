import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, signOut } from "../Actions/authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logout: (state) => {
    //   localStorage.removeItem("userToken"); // delete token from storage
    //   state.loading = false;
    //   state.userInfo = null;
    //   state.userToken = null;
    //   state.error = null;
    // },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    clearErrors: (state, { payload }) => {
      state.error = null;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = {
        email: payload.email,
        username: payload.username,
        id: payload.id,
      };
      state.userToken = payload;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.errors;
    },
    // signout user
    [signOut.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signOut.fulfilled]: (state, { payload }) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    [signOut.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setCredentials, clearErrors } = authSlice.actions;

export default authSlice.reducer;
