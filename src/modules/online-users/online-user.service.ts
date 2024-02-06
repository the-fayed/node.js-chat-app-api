import { AddOnlineUser, IOnlineUser, IOnlineUserService } from "./online-user.interface";
import { OnlineUserModel as OnlineUser } from "./online-user.model";
import ApiError from "../../shared/utils/api-error";
import { UserModel } from "../users/user.model";

export class OnlineUserService implements IOnlineUserService {
  async addOnlineUser(data: AddOnlineUser): Promise<void> {
    try {
      const exists = await this.getOnlineUser(data.userId);
      if (!exists) {
        const user = await OnlineUser.create({
          userId: data.userId,
          socketId: data.socketId,
        });
        const addToOnlineFriendsList = (await UserModel.find({ friends: { $in: data.userId } }))
          ? await UserModel.updateMany({ friends: { $in: data.userId } }, { $addToSet: { onlineFriends: user.userId } })
          : undefined;
      }
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data!", 500);
    }
  }

  async getAllOnlineUsers(): Promise<IOnlineUser[]> {
    try {
      const users = (await OnlineUser.find().select("userId socketId -_id")) as IOnlineUser[];
      return users;
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data!", 500);
    }
  }

  async getOnlineUser(userId: string): Promise<IOnlineUser> {
    try {
      const user = (await OnlineUser.findOne({ userId: userId }).select("userId socketId -_id")) as IOnlineUser;
      return user;
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data!", 500);
    }
  }

  async deleteOnlineUser(socketId: string): Promise<void> {
    try {
      const user = await OnlineUser.findOne({ socketId });
      await OnlineUser.deleteOne({ socketId });
      const operations = [
        {
          updateMany: {
            filter: { onlineFriends: { $in: user.userId } },
            update: { $pull: { onlineFriends: user.userId } },
          },
        },
      ];
      await UserModel.bulkWrite(operations as [], {});
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data!", 500);
    }
  }
}
