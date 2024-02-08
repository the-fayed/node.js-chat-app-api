"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const conversation_service_1 = require("./conversation.service");
class ConversationController {
    constructor() {
        this.createConversation = (0, express_async_handler_1.default)(async (req, res, next) => {
            const createConversationData = {
                senderId: req.user.id,
                receiverId: req.body.receiverId,
            };
            const result = await this.conversationService.createNewConversation(createConversationData);
            res.status(201).json({
                status: 'success',
                data: result
            });
        });
        this.getConversations = (0, express_async_handler_1.default)(async (req, res, next) => {
            const result = await this.conversationService.getConversations(req.user.id, req.query);
            res.status(200).json({
                status: 'success',
                paginationResults: result.paginationResults,
                data: result.documents,
            });
        });
        this.conversationService = new conversation_service_1.ConversationService();
    }
}
const conversationController = new ConversationController();
exports.default = conversationController;
//# sourceMappingURL=conversation.controller.js.map