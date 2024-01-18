import { AddOnlineUser, IOnlineUser, IOnlineUserService } from "./online-user.interface";
import ApiError from "../../shared/utils/api-error";
import { OnlineUserModel as OnlineUser } from "./online-user.model";

export class OnlineUserService implements IOnlineUserService {
  async addOnlineUser(data: AddOnlineUser): Promise<void> {
    try {
      const user = await OnlineUser.create({
        userId: data.userId,
        socketId: data.socketId,
      });
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }

  async getAllOnlineUsers(): Promise<IOnlineUser[]> {
    try {
      const users = (await OnlineUser.find()) as IOnlineUser[];
      return users;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }

  async getOnlineUser(userId: string): Promise<IOnlineUser> {
    try {
      const user = (await OnlineUser.findOne({ userId: userId })) as IOnlineUser;
      return user;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }

  async deleteOnlineUser(socketId: string): Promise<void> {
    try {
      await OnlineUser.deleteOne({ socketId: socketId });
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
