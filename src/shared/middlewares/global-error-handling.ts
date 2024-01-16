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

export const globalErrorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction): void => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || 'fail';
  console.log(error.name);
  if (process.env.NODE_ENV === 'Development') {
    return sendErrorOnDevelopment(error, res);
  } else {
    return sendErrorOnProduction(error, res);
  };
}