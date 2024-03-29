const sanitizer = require('express-sanitizer');
import { serve, setup } from 'swagger-ui-express';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';

import globalErrorHandler from '../shared/middlewares/global-error-handling';
import rateLimiter from '../shared/middlewares/rate-limiter';
import { routesMounter } from '../modules/routes-mounter';
import { dbConnection } from '../config/db-connection';
import ApiError from '../shared/utils/api-error';
import swaggerDocs from '../../swagger.json';


const app: express.Application = express();
dbConnection();

/**
 * adding security middlewares
 * cors => enabling cors
 * compression => enabling compression
 * hpp => to avoid hpp attacks
 * sanitizer => to avoid SQL or noSQL attacks
 * rate limiter => to avoid app crashing
 */
app.use(rateLimiter);

app.use(cors());
app.options('*', cors());

app.use(compression());

app.use(hpp());

app.use(sanitizer({
  level: 5,
  xss: true,
  nosql: true,
}));

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

/**
 * configure swagger options
 * using swagger to document apis
 */
const opts = {
  customCss: ".swagger-ui .topbar { display : none}",
};

app.use('/api-docs', serve, setup(swaggerDocs, opts))

// handling not implemented routes
app.use('*', (req, res, next) => {
  throw new ApiError(`Route ${req.baseUrl} not found!`, 404);
});

// using global error handler middleware
app.use(globalErrorHandler);

export default app;