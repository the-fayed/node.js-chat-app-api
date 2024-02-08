"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteFriendData = exports.validateAcceptAndRejectFriendRequestData = exports.validateSendOrCancelFriendRequestData = void 0;
const express_validator_1 = require("express-validator");
const validator_1 = require("../../shared/middlewares/validator");
const user_model_1 = require("../users/user.model");
exports.validateSendOrCancelFriendRequestData = [
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
exports.validateDeleteFriendData = [
    (0, express_validator_1.check)('friendId').notEmpty().withMessage('Friend id is required!').custom(async (value, { req }) => {
        const friend = await user_model_1.UserModel.findOne({ $and: [{ _id: req.user.id }, { friends: { $in: value } }] });
        if (!friend) {
            throw new Error('You are not friend with this user!');
        }
    }),
    validator_1.validateSchema,
];
//# sourceMappingURL=friend.validator.js.map