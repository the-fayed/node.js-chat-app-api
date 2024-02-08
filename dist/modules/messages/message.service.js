"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const message_model_1 = require("./message.model");
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
class MessageService {
    async createMessage(data) {
        const message = (await message_model_1.MessageModel.create(data));
        if (!message) {
            throw new api_error_1.default("Error while sending your message, please try again later!", 500);
        }
        return message;
    }
    async getAllMessages(conversationId) {
        const messages = (await message_model_1.MessageModel.find({ conversationId: conversationId }));
        if (!messages || !messages.length) {
            throw new api_error_1.default("No messages found!", 403);
        }
        return messages;
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map