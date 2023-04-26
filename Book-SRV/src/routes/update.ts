import {
  BadRequestError,
  isAuth,
  NotAuthorizedError,
  validateRequest,
} from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import {
  BookUpdatedPublisher,
  QBookUpdatedPublisher,
} from "../events/publisher/bookUpdatedPublisher";
import { Book } from "../models/book";
import { nats } from "../NatsWrapper";
import { cloudinaryConfig, multerUploads } from "../utils/config";

const router = express.Router();

router.put(
  "/api/booki/update/:bookId",
  multerUploads,
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
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const book = await Book.findById(bookId);

      if (!book) throw new BadRequestError("Sorry book not found");
      if (book.ownerId.toString() !== req.currentUser!.id)
        throw new NotAuthorizedError();

      let { title, author, description, genre, publishedDate, condition } =
        req.body;

      const file = req.file;
      let cloudinaryPublicId;
      let result =
        "https://res.cloudinary.com/doo1ivw33/image/upload/v1682083010/Booki/books/default_book_cover_2015_rtxonx.jpg";

      if (file) {
        const v2 = cloudinaryConfig();
        const encodedData = file.buffer.toString("base64");
        const finalData = `data:${file.mimetype};base64,${encodedData}`;
        const data = await v2.uploader.upload(finalData, {
          folder: "Booki/books",
        });
        cloudinaryPublicId = data.public_id;
        result = data.secure_url;
        if (book.cloudinaryPublicId) {
          await v2.uploader.destroy(book.cloudinaryPublicId);
        }
      }
      genre = JSON.parse(genre);

      book.set({
        title,
        author,
        description,
        genre,
        publishedDate,
        condition,
        coverImageUrl: result,
        cloudinaryPublicId,
      });
      await book.save();
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
      res.send(book);
    } catch (err) {
      return next(err);
    }
  }
);

export { router as UpdateBook };
