import mongoose from "mongoose";
import express from "express"
import cors from 'cors'
import cookieSession from 'cookie-session'
import {currentUserMiddleware, isVerified, NotFoundError, errorHandler} from "@hthub/common"
import { createProfileRouter, getProfileRouter } from "./routes";

const app = express()


app.use(cors())
app.use(express.json())
app.use(
    cookieSession({
      secure: true,
      signed: false,
    })
  );


// signed in and verified 
app.use(currentUserMiddleware)
app.use(isVerified)

//routes
app.use(createProfileRouter)
app.use(getProfileRouter)

// 404 error
app.use("*", (req, res) => {
    throw new NotFoundError();
  });
  
// error handling
app.use(errorHandler);
  

const start = async () => {
    if (!process.env.JWT_KEY) throw new Error("JWT Failed");
    if (!process.env.MONGO_URI) throw new Error('Mongodb URI must be defined')
    try {
      await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
      console.error(error);
    }
    app.listen(4001, () => {
      console.log("Profile -----> 4001");
    });
  };
  
start();