import { NextFunction, Request, Response } from "express";

import ApiError from "../utils/api-error";

const sendErrorOnProduction = (error: ApiError, res: Response): Response => {
  return res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
  });
};

const sendErrorOnDevelopment = (error: ApiError, res: Response): Response => {
  return res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const invalidJWTSignature = (): ApiError => new ApiError("Invalid Token!", 401);
const expiredJWTtoken = (): ApiError => new ApiError("Expired Token!", 401);

const globalErrorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction): Response => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || "fail";
  if (process.env.NODE_ENV === "Development") {
    return sendErrorOnDevelopment(error, res);
  } else {
    if (error.name === "JsonWebTokenError") error = invalidJWTSignature();
    if (error.name === "TokenExpiredError") error = expiredJWTtoken();
    return sendErrorOnProduction(error, res);
  }
};

export default globalErrorHandler;
