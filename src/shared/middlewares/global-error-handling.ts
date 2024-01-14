import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";

const sendErrorOnProduction = (error: ApiError, res: Response): void => {
  res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
  });
};

const sendErrorOnDevelopment = (error: ApiError, res: Response): void => {
  res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const invalidJwtSignature = (): ApiError => new ApiError('Invalid JWT Signature!', 401);
const expiredJwrToken = (): ApiError => new ApiError('Expired Token!', 401);

export const globalErrorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction):void => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || 'fail';
  if (process.env.NODE_ENV === 'Development') {
    sendErrorOnDevelopment(error, res);
  } else {
    if (error.name === 'JsonWebTokenError') invalidJwtSignature();
    if (error.name === 'TokenExpiredError') expiredJwrToken();
    sendErrorOnProduction(error, res);
  };
}