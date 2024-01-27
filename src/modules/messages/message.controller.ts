import asyncHandler from "express-async-handler";

import { MessageService } from "./message.service";
import { AuthRequest } from "../auth/auth.interface";
import { CreateMessageData } from "./message.interface";

class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  createMessage = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const createMessageData: CreateMessageData = {
      senderId: req.user.id,
      conversationId: req.params.conversationId,
      content: req.body.content,
    };
    const result = await this.messageService.createMessage(createMessageData);
    res.status(201).json({
      status: "success",
      data: result,
    });
  });

  getAllMessages = asyncHandler(async (req, res, next): Promise<void> => {
    const conversationId = req.params.conversationId;
    const result = await this.messageService.getAllMessages(conversationId, req.query);
    res.status(200).json({
      status: "success",
      paginationResult: result.paginationResults,
      data: result.documents,
    });
  });
}

const messageController = new MessageController();

export default messageController;
