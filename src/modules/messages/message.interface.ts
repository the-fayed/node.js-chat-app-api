import { Document } from 'mongoose';

import { ApiFeatureResponse, IQueryString } from '../../shared/utils/utils.interface';

export interface IMessage extends Document {
  senderId: string;
  conversationId: string;
  content: string;
}

export interface CreateMessageData {
  senderId: string;
  conversationId: string;
  content: string;
}

export interface IMessageService {
  createMessage: (data: CreateMessageData) => Promise<IMessage>;
  getAllMessages: (conversationId: string, reqQuery: IQueryString) => Promise<ApiFeatureResponse>;
}