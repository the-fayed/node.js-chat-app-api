import { UploadApiOptions } from 'cloudinary';

import cloudinary from '../../config/cloudinary';
import { ApiError } from './api-error';

export const uploadToCloudinary = async (filename: string, opt: UploadApiOptions) => {
  try {
    return (await cloudinary.uploader.upload(filename, opt)).url;
  } catch (error) {
    console.log('Error while trying to upload image to Cloudinary', error);
    throw new ApiError('Error while creating new account, please try again later!', 400);
  }
}
