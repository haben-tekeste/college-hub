import { isAuth, validateRequest } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import {
  BookCreatedPublisher,
  EBookCreatedPublisher,
  QBookCreatedPublisher,
} from "../events/publisher/bookCreatedPublisher";
import { Book } from "../models/book";
import { nats } from "../NatsWrapper";

const router = express.Router();

router.post(
  "/api/booki/new-book",
  isAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("author").not().isEmpty().withMessage("Author is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("genre").not().isEmpty().withMessage("Genre is required"),
    body("condition")
      .not()
      .isEmpty()
      .withMessage("The condition of the book needs to be stated"),
    body("publishedDate")
      .not()
      .isEmpty()
      .withMessage("Published date is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.currentUser!.id;
      const { title, author, description, genre, publishedDate, condition } =
        req.body;
      const book = new Book({
        title,

        author,
        description,
        genre,
        publishedDate,
        ownerId: id,
        condition,
      });

      await book.save();
      new QBookCreatedPublisher(nats.client).publish({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedDate: book.publishedDate,
        description: book.description,
        ownerId: book.ownerId,
        condition: book.condition,
        coverImage: book.coverImageUrl,
        comments: [],
      });

      new EBookCreatedPublisher(nats.client).publish({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedDate: book.publishedDate,
        description: book.description,
        ownerId: book.ownerId,
        condition: book.condition,
        coverImage: book.coverImageUrl,
      });

      new BookCreatedPublisher(nats.client).publish({
        id: book.id,
      });

      res.send(book);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as newBook };
