import multer, { FileFilterCallback } from "multer";
import { v2 } from "cloudinary";

import { Request } from "express";

const storage = multer.memoryStorage();
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const multerUploads = multer({ storage, fileFilter }).single("image");

const cloudinaryConfig = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME)
    throw new Error("CLOUDINARY config failed");
  if (!process.env.CLOUDINARY_API_KEY)
    throw new Error("CLOUDINARY config failed");
  if (!process.env.CLOUDINARY_API_SECRET)
    throw new Error("CLOUDINARY config failed");
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return v2;
};

export { multerUploads, cloudinaryConfig };
