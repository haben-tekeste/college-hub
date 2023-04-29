import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Services/authService";

//slices
import profileReducer from "./profile";
import projectReducer from "./project";
import projectDetailsReducer from "./projectDetails";
import applicationReducer from "./application";
import questionReducer from "./questions";
import answerDetailsReducer from "./answerDetails";
import authenticationrReducer from "./authentication";
import blogReducer from "./blogs";
import booksReducer from "./books";
import bookDetailsReducer from "./bookDetails";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    projects: projectReducer,
    projectDetails: projectDetailsReducer,
    application: applicationReducer,
    questions: questionReducer,
    answerDetails: answerDetailsReducer,
    auth: authenticationrReducer,
    blogs: blogReducer,
    books: booksReducer,
    bookDetails: bookDetailsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
