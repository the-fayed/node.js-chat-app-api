"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_service_1 = require("./message.service");
class MessageController {
    constructor() {
        this.createMessage = (0, express_async_handler_1.default)(async (req, res, next) => {
            const createMessageData = {
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
        this.getAllMessages = (0, express_async_handler_1.default)(async (req, res, next) => {
            const conversationId = req.params.conversationId;
            const result = await this.messageService.getAllMessages(conversationId);
            res.status(200).json({
                status: "success",
                data: result,
            });
        });
        this.messageService = new message_service_1.MessageService();
    }
}
const messageController = new MessageController();
exports.default = messageController;
//# sourceMappingURL=message.controller.js.map