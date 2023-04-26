import { BadRequestError, isAuth } from "@booki/common";
import express, { Response, Request, NextFunction } from "express";
import mongoose, { ObjectId } from "mongoose";
import { BookUpdatedPublisher, QBookUpdatedPublisher } from "../events/publisher/bookUpdatedPublisher";
import { Book } from "../models/book";
import { nats } from "../NatsWrapper";

const router = express.Router();

router.put(
  "/api/booki/:bookId",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const book = await Book.findById(bookId);

      if (!book) throw new BadRequestError("Book not found");
      const userExists: string | undefined = book.likes.find(
        (id) => id === req.currentUser!.id
      );

      if (!userExists) {
        console.log("====> here");
        book.likes.push(req.currentUser!.id);
      } else {
        book.likes = book.likes.filter((id) => id !== req.currentUser!.id);
      }


      new BookUpdatedPublisher(nats.client).publish({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedDate: book.publishedDate,
        description: book.description,
        ownerId: book.ownerId,
        condition: book.condition,
        coverImage: book.coverImageUrl,
        likes: book.likes,
        cloudinaryPublicId: book.cloudinaryPublicId,
      });

      new QBookUpdatedPublisher(nats.client).publish({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedDate: book.publishedDate,
        description: book.description,
        ownerId: book.ownerId,
        condition: book.condition,
        coverImage: book.coverImageUrl,
        likes: book.likes,
        comments: [],
        cloudinaryPublicId: book.cloudinaryPublicId,
      });

      await book.save();
      res.send(book);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as likeBook };
