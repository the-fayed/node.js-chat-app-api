"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSendMessage = void 0;
const express_validator_1 = require("express-validator");
const conversation_model_1 = require("../conversations/conversation.model");
const user_model_1 = require("../users/user.model");
const validator_1 = require("../../shared/middlewares/validator");
exports.validateSendMessage = [
    (0, express_validator_1.check)('conversationId').notEmpty().withMessage('ConversationId is required!').isMongoId().withMessage('Invalid Conversation id!').custom(async (value) => {
        const conversation = await conversation_model_1.ConversationModel.findOne({ _id: value });
        if (!conversation) {
            throw new Error('Conversation not found!');
        }
    }),
    (0, express_validator_1.check)('receiverId').notEmpty().withMessage('Message receiver id is required!').isMongoId().withMessage('Invalid user id!').custom(async (value, { req }) => {
        const user = await user_model_1.UserModel.findOne({ _id: value });
        if (!user || req.user.id === value) {
            throw new Error('User not found!');
        }
        return true;
    }),
    validator_1.validateSchema,
];
//# sourceMappingURL=messages.validator.js.map