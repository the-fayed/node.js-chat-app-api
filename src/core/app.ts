import express from 'express';
import morgan from 'morgan';

import globalErrorHandler from '../shared/middlewares/global-error-handling';
import { routesMounter } from '../modules/routes-mounter';
import { dbConnection } from '../config/db-connection';
import ApiError from '../shared/utils/api-error';
import io from "./socket-io";


const app: express.Application = express();
const socketPort: number = parseInt(process.env.SOCKET_PORT as string) || 8900;
dbConnection();



/**
 * Public middlewares
 * Provided by express
 * convert incoming data to json by express.json()
 * using express.urlencoded() to handle form-data requests
 * using the "limit" property to limit the request size as a security major
 */
app.use(express.json({ limit: '30kb' }));
app.use(express.urlencoded({ extended: false, limit: '30kb' }));

/**
 * logger middleware for development environment
 * package name: morgan
 */
if (process.env.NODE_ENV === 'Development') {
  app.use(morgan('dev'))
  console.log(`Environment: ${process.env.NODE_ENV}`);
}

/**
 * mount routes
 * dist: src/modules/routes-mounter.ts
 */
routesMounter(app);

// init socket server
io.listen(socketPort);

// handling not implemented routes
app.use('*', (req, res, next) => {
  throw new ApiError(`Route ${req.baseUrl} not found!`, 404);
});

// using global error handler middleware
app.use(globalErrorHandler);

export default app;