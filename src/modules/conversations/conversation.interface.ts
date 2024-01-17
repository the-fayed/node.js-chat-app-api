import { Document, ObjectId } from 'mongoose';

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
  getConversations: (userId: string) => Promise<IConversation[]>;
}
