"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const conversation_model_1 = require("./conversation.model");
const api_feature_1 = require("../../shared/utils/api-feature");
const user_model_1 = require("../users/user.model");
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
class ConversationService {
    async createNewConversation(data) {
        let conversation;
        // check if conversation already exists
        conversation = (await conversation_model_1.ConversationModel.findOne({
            $or: [{ members: [data.senderId, data.receiverId] }, { members: [data.receiverId, data.senderId] }],
        }));
        if (conversation) {
            return conversation;
            // creating conversation if not existing
        }
        else {
            // checking if sender and receiver are friends
            const isFriend = await user_model_1.UserModel.findOne({
                $and: [{ _id: data.senderId }, { friends: { $in: data.receiverId } }],
            });
            if (isFriend) {
                conversation = (await conversation_model_1.ConversationModel.create({
                    members: [data.senderId, data.receiverId],
                }));
                if (!conversation) {
                    throw new api_error_1.default("Error while creating conversation!", 500);
                }
                return conversation;
            }
            else {
                throw new api_error_1.default("You can only start conversations with your friends!", 400);
            }
        }
    }
    async getConversations(userId, reqQuery) {
        const documentsCount = await conversation_model_1.ConversationModel.countDocuments({ members: { $in: userId } });
        const apiFeature = new api_feature_1.ApiFeature(conversation_model_1.ConversationModel.find({ members: { $in: userId } }), reqQuery)
            .paginate(documentsCount)
            .sort();
        const { MongooseQuery, PaginationResult } = apiFeature;
        const conversations = await MongooseQuery;
        const paginationResults = PaginationResult;
        return { documents: conversations, paginationResults };
    }
}
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map