import express, { NextFunction, Request, Response } from "express";

import { v2 } from "cloudinary";

const cloudinaryConfig = (req:Request, res:Response, next:NextFunction) => {
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next()
};

export {cloudinaryConfig}
