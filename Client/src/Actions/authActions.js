import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "https://studenthub.dev/api/users";
// const backendURL = 'http://127.0.0.1:5000'

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/signin`,
        { email, password },
        config
      );

      console.log("data", data);
      // store user's token in local storage
      localStorage.setItem("userToken", data.jwtToken);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${backendURL}/signup`,
        { username, email, password },
        config
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signOut = createAsyncThunk(
  "user/logout",
  async ({ rejectWithValue }) => {
    try {
      console.log("herr-->");
      await axios.post(
        `${backendURL}/signout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
