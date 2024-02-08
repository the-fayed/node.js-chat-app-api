"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineUserService = void 0;
const online_user_model_1 = require("./online-user.model");
const user_model_1 = require("../users/user.model");
class OnlineUserService {
    async addOnlineUser(data) {
        const exists = await this.getOnlineUser(data.userId);
        if (!exists) {
            const user = await online_user_model_1.OnlineUserModel.create({
                userId: data.userId,
                socketId: data.socketId,
            });
            const addToOnlineFriendsList = (await user_model_1.UserModel.find({ friends: { $in: data.userId } }))
                ? await user_model_1.UserModel.updateMany({ friends: { $in: data.userId } }, { $addToSet: { onlineFriends: user.userId } })
                : undefined;
        }
    }
    async getAllOnlineUsers() {
        const users = (await online_user_model_1.OnlineUserModel.find().select("userId socketId -_id"));
        return users;
    }
    async getOnlineUser(userId) {
        const user = (await online_user_model_1.OnlineUserModel.findOne({ userId: userId }).select("userId socketId -_id"));
        return user;
    }
    async deleteOnlineUser(socketId) {
        const user = await online_user_model_1.OnlineUserModel.findOne({ socketId });
        await online_user_model_1.OnlineUserModel.deleteOne({ socketId });
        const operations = [
            {
                updateMany: {
                    filter: { onlineFriends: { $in: user.userId } },
                    update: { $pull: { onlineFriends: user.userId } },
                },
            },
        ];
        await user_model_1.UserModel.bulkWrite(operations, {});
    }
}
exports.OnlineUserService = OnlineUserService;
//# sourceMappingURL=online-user.service.js.map