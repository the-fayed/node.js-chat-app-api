import express from 'express';
import * as dotenv from 'dotenv';

import { globalErrorHandler } from '../shared/middlewares/global-error-handling';
import { ApiError } from '../shared/utils/api-error';

dotenv.config();
const app: express.Application = express();

// handling not implemented routes
app.use('*', (req, res, next) => {
  throw new ApiError(`Route ${req.baseUrl} not found!`, 404);
});

// using global error handler middleware
app.use(globalErrorHandler);

export default app;