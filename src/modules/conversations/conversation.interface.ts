import { Document, ObjectId } from 'mongoose';
import { ApiFeatureResponse, IQueryString } from '../../shared/utils/utils.interface';

export interface IConversation extends Document {
  members: ObjectId[];
  createdAt: Date;
}

export interface CreateConversationData {
  senderId: string;
  receiverId: string;
}

export interface GetConversationData {
  conversationId: string;
  userId: string;
}

export interface IConversationService {
  createNewConversation: (date: CreateConversationData) => Promise<IConversation>;
  getConversations: (userId: string, reqQuery: IQueryString) => Promise<ApiFeatureResponse>;
}
