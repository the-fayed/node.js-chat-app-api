import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateSchema = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(409).json({
      status: 'error',
      errors: errors.array(),
    })
  }
  next();
}