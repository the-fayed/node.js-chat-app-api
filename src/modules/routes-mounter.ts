import express from 'express';

import conversationRoutes from './conversations/conversation.routes';
import messageRoutes from './messages/message.routes';
import friendRoutes from './friends/friend.routes';
import userRoutes from './users/user.routes';
import authRoutes from './auth/auth.routes';

export const routesMounter = (app: express.Application): void => {
  app.use('/api/v1/conversations', conversationRoutes);
  app.use('/api/v1/messages', messageRoutes);
  app.use('/api/v1/friends', friendRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/auth', authRoutes);
}