import express from 'express';

import userRoutes from './users/user.routes';

export const routesMounter = (app: express.Application): void => {
  app.use('/api/v1/users', userRoutes);
}