import { AddOnlineUser, IOnlineUser, IOnlineUserService } from "./online-user.interface";
import { OnlineUserModel as OnlineUser } from "./online-user.model";
import ApiError from "../../shared/utils/api-error";

export class OnlineUserService implements IOnlineUserService {
  async addOnlineUser(data: AddOnlineUser): Promise<void> {
    try {
      const exists = await this.getOnlineUser(data.userId);
      if (!exists) {
        const user = await OnlineUser.create({
          userId: data.userId,
          socketId: data.socketId,
        });
      }
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }

  async getAllOnlineUsers(): Promise<IOnlineUser[]> {
    try {
      const users = (await OnlineUser.find().select("userId socketId -_id")) as IOnlineUser[];
      return users;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }

  async getOnlineUser(userId: string): Promise<IOnlineUser> {
    try {
      const user = (await OnlineUser.findOne({ userId: userId }).select("userId socketId -_id")) as IOnlineUser;
      return user;
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }

  async deleteOnlineUser(socketId: string): Promise<void> {
    try {
      await OnlineUser.deleteOne({ socketId: socketId });
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }
}
