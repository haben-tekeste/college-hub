import { BadRequestError, isAuth, validateRequest } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ReplyUpdatedPublisher } from "../events/publisher/replyUpdatedPublisher";
import { Reply } from "../models/reply";
import { nats } from "../NatsWrapper";

const router = express.Router();

router.put(
  "/api/comments/likeReply",
  [
    body("replyId").not().isEmpty().withMessage("No reply given"),
    body("commentId").not().isEmpty().withMessage("No Comment given"),
  ],
  validateRequest,
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { replyId, commentId } = req.body;

      const reply = await Reply.findById(replyId);
      if (!reply) throw new BadRequestError("No reply found");
      const userExists: string | undefined = reply.likes.find(
        (id) => id === req.currentUser!.id
      );

      if (!userExists) {
        console.log("====> here");
        reply.likes.push(req.currentUser!.id);
      } else {
        reply.likes = reply.likes.filter((id) => id !== req.currentUser!.id);
      }

      await reply.save();

      new ReplyUpdatedPublisher(nats.client).publish({
        id: reply.id,
        userId: reply.userId,
        text: reply.text,
        likes: reply.likes,
        commentId: commentId,
      });
      res.send(reply);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as likeReply };
