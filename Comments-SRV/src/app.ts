import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import {
  NotFoundError,
  errorHandler,
  currentUserMiddleware,
} from "@booki/common";
import cookieSession from "cookie-session";
import { newComment } from "./routes/index";
import { replay } from "./routes/replyComment";
// import { bookComments } from "../../archive/bookComment";
import { likeComment } from "./routes/likeComment";
import { likeReply } from "./routes/likeReply";
const app = express();

app.set("proxy", true);
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);
app.use(currentUserMiddleware);
// app.use(bookComments);
app.use(newComment);
app.use(replay);
app.use(likeComment);
app.use(likeReply);
// 404 error
app.use("*", (req, res) => {
  throw new NotFoundError();
});

// error handling
app.use(errorHandler);

export { app };
