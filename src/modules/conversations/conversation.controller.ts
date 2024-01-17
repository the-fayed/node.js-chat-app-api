import asyncHandler from 'express-async-handler';

import { ConversationService } from './conversation.service';
import { CreateConversationData, GetConversationData } from './conversation.interface';
import { AuthRequest } from '../auth/auth.interface';

class ConversationController {
  private conversationService: ConversationService;

  constructor() {
    this.conversationService = new ConversationService();
  }

  createConversation = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const createConversationData: CreateConversationData = {
      senderId: req.user.id,
      receiverId: req.body.receiverId,
    };
    const result = await this.conversationService.createNewConversation(createConversationData);
    res.status(201).json({
      status: 'success',
      data: result
    });
  });

  getConversations = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const result = await this.conversationService.getConversations(req.user.id);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  })
}

const conversationController = new ConversationController();

export default conversationController;
