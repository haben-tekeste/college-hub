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

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    project: projectReducer,
    projectDetails: projectDetailsReducer,
    application: applicationReducer,
    questions: questionReducer,
    answerDetails: answerDetailsReducer,
    auth: authenticationrReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
