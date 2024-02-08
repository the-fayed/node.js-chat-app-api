"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const api_feature_1 = require("../../shared/utils/api-feature");
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
    async getAllMessages(conversationId, reqQuery) {
        const documentCount = await message_model_1.MessageModel.countDocuments({ conversationId });
        const apiFeature = new api_feature_1.ApiFeature(message_model_1.MessageModel.find({ conversationId }), reqQuery)
            .paginate(documentCount)
            .sort()
            .search();
        const { MongooseQuery, PaginationResult } = apiFeature;
        const messages = await MongooseQuery;
        if (!messages || !messages.length) {
            throw new api_error_1.default("No messages found!", 204);
        }
        return { documents: messages, paginationResults: PaginationResult };
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map