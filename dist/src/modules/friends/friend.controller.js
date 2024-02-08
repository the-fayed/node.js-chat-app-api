"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const friend_service_1 = require("./friend.service");
class FriendController {
    constructor() {
        this.sendFriendRequest = (0, express_async_handler_1.default)(async (req, res, next) => {
            const friendRequestData = {
                senderId: req.user.id,
                receiverId: req.params.receiverId,
            };
            const result = await this.friendService.sendFriendRequest(friendRequestData);
            res.status(201).json({
                status: "success",
                data: result,
            });
        });
        this.cancelFriendRequest = (0, express_async_handler_1.default)(async (req, res, next) => {
            const friendRequestData = {
                senderId: req.user.id,
                receiverId: req.params.receiverId,
            };
            const result = await this.friendService.cancelFriendRequest(friendRequestData);
            res.status(200).json({
                status: "success",
                data: result,
            });
        });
        this.acceptFriendRequest = (0, express_async_handler_1.default)(async (req, res, next) => {
            const friendRequestData = {
                receiverId: req.user.id,
                senderId: req.params.senderId,
            };
            const result = await this.friendService.acceptFriendRequest(friendRequestData);
            res.status(200).json({
                status: "success",
                data: result,
            });
        });
        this.rejectFriendRequest = (0, express_async_handler_1.default)(async (req, res, next) => {
            const friendRequestData = {
                receiverId: req.user.id,
                senderId: req.params.senderId,
            };
            const result = await this.friendService.rejectFriendRequest(friendRequestData);
            res.status(200).json({
                status: "success",
                data: result,
            });
        });
        this.getAllFriendRequests = (0, express_async_handler_1.default)(async (req, res, next) => {
            const result = await this.friendService.getAllFriendRequests(req.user.id);
            res.status(200).json({
                status: "success",
                data: result,
            });
        });
        this.getAllFriends = (0, express_async_handler_1.default)(async (req, res, next) => {
            const result = await this.friendService.getAllFriends(req.user.id);
            res.status(200).json({
                status: "success",
                data: result,
            });
        });
        this.deleteFriend = (0, express_async_handler_1.default)(async (req, res, next) => {
            const deleteFriendData = {
                userId: req.user.id,
                friendId: req.params.userId,
            };
            const result = await this.friendService.deleteFriend(deleteFriendData);
            res.status(200).json({
                status: "success",
                data: result,
            });
        });
        this.friendService = new friend_service_1.FriendService();
    }
}
const friendController = new FriendController();
exports.default = friendController;
//# sourceMappingURL=friend.controller.js.map