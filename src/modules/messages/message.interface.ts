import { Document } from 'mongoose';

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
  getAllMessages: (conversationId: string) => Promise<IMessage[]>;
}