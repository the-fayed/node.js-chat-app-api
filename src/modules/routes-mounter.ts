import express from 'express';

import conversationRoutes from './conversations/conversation.routes';
import userRoutes from './users/user.routes';
import authRoutes from './auth/auth.routes';

export const routesMounter = (app: express.Application): void => {
  app.use('/api/v1/conversations', conversationRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/auth', authRoutes);
}