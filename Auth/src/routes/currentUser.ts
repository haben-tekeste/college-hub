import express from "express";
import { currentUserMiddleware } from "@hthub/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUserMiddleware,
  (req, res, next) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentuserRouter };