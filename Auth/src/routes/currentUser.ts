import express from "express";
import { currentUserMiddleware } from "../../../Common/src";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUserMiddleware,
  (req, res, next) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentuserRouter };