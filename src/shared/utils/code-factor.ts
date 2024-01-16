import { UploadApiOptions } from "cloudinary";
import jwt from "jsonwebtoken";

import { Payload } from '../../modules/auth/auth.interface';
import cloudinary from "../../config/cloudinary";
import { ApiError } from "./api-error";

export const uploadToCloudinary = async (filename: string, opt: UploadApiOptions) => {
  try {
    return (await cloudinary.uploader.upload(filename, opt)).url;
  } catch (error) {
    console.log("Error while trying to upload image to Cloudinary", error);
    throw new ApiError("Error while creating new account, please try again later!", 400);
  }
};

export const generateAccessToken = (payload: Payload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
