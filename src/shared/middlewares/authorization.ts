import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { AuthRequest, Decoded } from "../../modules/auth/auth.interface";
import { UserModel as User } from "../../modules/users/user.model";
import { IUser } from "../../modules/users/user.interface";
import ApiError from "../../shared/utils/api-error";

export const isAuthorized = () => {
  return asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(new ApiError("Your not logged in, please log in to continue!", 403));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as Decoded;
      if (!decoded) {
        return next(new ApiError("Unauthorized!", 401));
      }
      const user = (await User.findOne({ _id: decoded.userId })) as IUser;
      if (!user) {
        return next(new ApiError("Unauthorized!", 401));
      }
      req.user = user;
      next();
    } else {
      return next(new ApiError("You are not authorized to perform this action!", 401));
    }
  });
};
