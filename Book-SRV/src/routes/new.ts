import { isAuth, validateRequest } from "@booki/common";
import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import {
  BookCreatedPublisher,
  CBookCreatedPublisher,
  QBookCreatedPublisher,
} from "../events/publisher/bookCreatedPublisher";
import { Book } from "../models/book";
import { nats } from "../NatsWrapper";
import { cloudinaryConfig, multerUploads } from "../utils/config";

const router = express.Router();

router.post(
  "/api/booki/new-book",
  isAuth,
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.currentUser!.id;
      let { title, author, description, genre, publishedDate, condition } =
        req.body;
      const file = req.file;
      let publicId;
      let result =
        "https://res.cloudinary.com/doo1ivw33/image/upload/v1682083010/Booki/books/default_book_cover_2015_rtxonx.jpg";

      if (file) {
        const v2 = cloudinaryConfig();
        const encodedData = file.buffer.toString("base64");
        const finalData = `data:${file.mimetype};base64,${encodedData}`;
        const data = await v2.uploader.upload(finalData, {
          folder: "Booki/books",
        });
        console.log(data);
        publicId = data.public_id;
        result = data.secure_url;
      }
      genre = JSON.parse(genre);

      const book = new Book({
        title,
        author,
        description,
        genre,
        publishedDate,
        ownerId: id,
        condition,
        coverImageUrl: result,
        likes: [],
        cloudinaryPublicId: publicId,
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
        likes: [],
        cloudinaryPublicId: book.cloudinaryPublicId,
      });

      new BookCreatedPublisher(nats.client).publish({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedDate: book.publishedDate,
        description: book.description,
        ownerId: book.ownerId,
        condition: book.condition,
        coverImage: book.coverImageUrl,
        cloudinaryPublicId: book.cloudinaryPublicId,
        likes: [],
      });

      new CBookCreatedPublisher(nats.client).publish({
        id: book.id,
      });

      res.send(book);
    } catch (error) {
      return next(error);
    }
  }
);

export { router as newBook };
