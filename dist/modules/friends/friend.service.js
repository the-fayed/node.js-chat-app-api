"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendService = void 0;
const user_model_1 = require("../users/user.model");
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
class FriendService {
    async sendFriendRequest(data) {
        try {
            const operations = [
                {
                    updateOne: {
                        filter: { _id: data.receiverId },
                        update: { $addToSet: { friendRequests: data.senderId } },
                    },
                },
            ];
            const result = await user_model_1.UserModel.bulkWrite(operations, {});
            if (result.modifiedCount < 0) {
                throw new api_error_1.default("Error while sending friend request!", 400);
            }
            return "Friend request has been sent successfully!";
        }
        catch (error) {
            console.log(error);
            throw new api_error_1.default("Error while sending friend request, please try again later!", 500);
        }
    }
    async acceptFriendRequest(data) {
        const operations = [
            {
                updateOne: {
                    filter: { _id: data.receiverId },
                    update: {
                        $pull: { friendRequests: data.senderId },
                        $addToSet: { friends: data.senderId },
                    },
                },
            },
            {
                updateOne: {
                    filter: { _id: data.senderId },
                    update: {
                        $addToSet: { friends: data.receiverId },
                    },
                },
            },
        ];
        const result = await user_model_1.UserModel.bulkWrite(operations, {});
        if (result.modifiedCount < 0) {
            throw new api_error_1.default("Error while accepting friend request!", 400);
        }
        return "Friend request accepted successfully!";
    }
    async rejectFriendRequest(data) {
        const operations = [
            {
                updateOne: {
                    filter: { _id: data.receiverId },
                    update: {
                        $pull: { friendRequests: data.senderId },
                    },
                },
            },
        ];
        const result = await user_model_1.UserModel.bulkWrite(operations, {});
        if (result.modifiedCount < 0) {
            throw new api_error_1.default("Error while rejecting friend request!", 400);
        }
        return "Friend request rejected successfully!";
    }
    async getAllFriends(userId) {
        const friends = (await user_model_1.UserModel.findOne({ _id: userId })
            .select("friends")
            .populate("friends", "username avatar"));
        if (!friends) {
            throw new api_error_1.default("User not found!", 404);
        }
        return friends;
    }
    async getAllFriendRequests(userId) {
        const friendRequests = (await user_model_1.UserModel.findOne({ _id: userId })
            .select("friendRequests -_id")
            .populate("friendRequests", "username avatar"));
        if (!friendRequests) {
            throw new api_error_1.default("User not found!", 404);
        }
        return friendRequests;
    }
}
exports.FriendService = FriendService;
//# sourceMappingURL=friend.service.js.map