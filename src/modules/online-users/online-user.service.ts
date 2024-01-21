import { AddOnlineUser, IOnlineUser, IOnlineUserService } from "./online-user.interface";
import { OnlineUserModel as OnlineUser } from "./online-user.model";
import ApiError from "../../shared/utils/api-error";
import { UserModel } from '../users/user.model';

export class OnlineUserService implements IOnlineUserService {
  async addOnlineUser(data: AddOnlineUser): Promise<void> {
    const exists = await this.getOnlineUser(data.userId);
    if (!exists) {
      const user = await OnlineUser.create({
        userId: data.userId,
        socketId: data.socketId,
      });
      const addToOnlineFriendsList = await UserModel.find({ $in: { friends: user._id } });
    }
  }

  async getAllOnlineUsers(): Promise<IOnlineUser[]> {
    const users = (await OnlineUser.find().select("userId socketId -_id")) as IOnlineUser[];
    return users;
  }

  async getOnlineUser(userId: string): Promise<IOnlineUser> {
    const user = (await OnlineUser.findOne({ userId: userId }).select("userId socketId -_id")) as IOnlineUser;
    return user;
  }

  async deleteOnlineUser(socketId: string): Promise<void> {
    const user = await OnlineUser.findOne({ socketId });
    await OnlineUser.deleteOne({ socketId });
    await UserModel.updateMany({ $in: { friends: user._id } }, { friends: { $pull: user._id } });
  }
}
