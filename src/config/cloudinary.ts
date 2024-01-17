import { v2 as cloudinary } from "cloudinary";
import * as dotenv from 'dotenv';

/**
 * importing and configure dotenv variables in this file
 * to error of "must supply api_key"
 */
dotenv.config();

cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_CLOUD_NAME as string),
  api_secret: (process.env.CLOUDINARY_API_SECRET as string),
  api_key: (process.env.CLOUDINARY_API_KEY as string),
});

export default cloudinary;
