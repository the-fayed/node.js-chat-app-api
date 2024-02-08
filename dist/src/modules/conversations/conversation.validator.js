"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateConversationData = void 0;
const express_validator_1 = require("express-validator");
const validator_1 = require("../../shared/middlewares/validator");
const user_model_1 = require("../users/user.model");
exports.validateCreateConversationData = [
    (0, express_validator_1.check)('receiverId').notEmpty().withMessage('Receiver id is required!').isMongoId().withMessage('Invalid receiver id!').custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ _id: value });
        if (!user) {
            throw new Error('User not found!');
        }
    }),
    validator_1.validateSchema,
];
//# sourceMappingURL=conversation.validator.js.map