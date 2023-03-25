import express from "express";
import { currentUserMiddleware } from "@hthub/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUserMiddleware,
  (req, res, next) => {
    console.log("Run");
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentuserRouter };
