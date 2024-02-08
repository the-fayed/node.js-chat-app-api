"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAcceptAndRejectFriendRequestData = exports.validateSendFriendRequestData = void 0;
const express_validator_1 = require("express-validator");
const validator_1 = require("../../shared/middlewares/validator");
const user_model_1 = require("../users/user.model");
exports.validateSendFriendRequestData = [
    (0, express_validator_1.check)('receiverId').notEmpty().withMessage('User id is required!').isMongoId().withMessage('Invalid user id!').custom((value, { req }) => {
        if (value === req.user.id) {
            throw new Error('You can not send a friend request to your self!');
        }
        return true;
    }).custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ _id: value });
        if (!user) {
            throw new Error('User not found!');
        }
    }),
    validator_1.validateSchema
];
exports.validateAcceptAndRejectFriendRequestData = [
    (0, express_validator_1.check)("senderId")
        .notEmpty()
        .withMessage("User id is required!")
        .isMongoId()
        .withMessage("Invalid user id!")
        .custom((value, { req }) => {
        if (value === req.user.id) {
            throw new Error("You can not send a friend request to your self!");
        }
        return true;
    })
        .custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ _id: value });
        if (!user) {
            throw new Error("User not found!");
        }
    }),
    validator_1.validateSchema,
];
//# sourceMappingURL=friend.validator.js.map