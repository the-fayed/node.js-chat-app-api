import { FriendRequestData, IFriendRequest, IFriend, IFriendService, IDeleteFriendData } from "./friend.interface";
import { UserModel as User } from "../users/user.model";
import ApiError from "../../shared/utils/api-error";

export class FriendService implements IFriendService {
  async sendFriendRequest(data: FriendRequestData): Promise<string> {
    try {
      const operations = [
        {
          updateOne: {
            filter: { _id: data.receiverId },
            update: { $addToSet: { friendRequests: data.senderId } },
          },
        },
      ];
      const result = await User.bulkWrite(operations as [], {});
      if (result.modifiedCount < 0) {
        throw new ApiError("Error while sending friend request!", 400);
      }
      return "Friend request has been sent successfully!";
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while sending friend request, please try again later!", 500);
    }
  }

  async cancelFriendRequest(data: FriendRequestData):Promise<string> {
    const operations = [
      {
        updateOne: {
          filter: { _id: data.receiverId },
          update: { $pull: { friendRequests: data.senderId } }
        },
      },
    ];
    const result = await User.bulkWrite(operations as [], {});
    if (result.modifiedCount < 0) {
      throw new ApiError('Error while canceling friend request!', 400);
    }
    return 'Friend request has been canceled successfully!';
  }

  async acceptFriendRequest(data: FriendRequestData): Promise<string> {
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
    const result = await User.bulkWrite(operations as [], {});
    console.log(result.modifiedCount);
    if (result.modifiedCount < 2) {
      throw new ApiError("Error while accepting friend request!", 400);
    }
    return "Friend request accepted successfully!";
  }

  async rejectFriendRequest(data: FriendRequestData): Promise<string> {
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
    const result = await User.bulkWrite(operations as [], {});
    if (result.modifiedCount < 0) {
      throw new ApiError("Error while rejecting friend request!", 400);
    }
    return "Friend request rejected successfully!";
  }

  async getAllFriends(userId: string): Promise<IFriend[]> {
    const friends = (await User.findOne({ _id: userId })
      .select("friends")
      .populate("friends", "username avatar")) as IFriend[];
    if (!friends || !friends.length) {
      throw new ApiError("User not found!", 204);
    }
    return friends;
  }

  async getAllFriendRequests(userId: string): Promise<IFriendRequest[]> {
    const friendRequests = (await User.findOne({ _id: userId })
      .select("friendRequests -_id")
      .populate("friendRequests", "username avatar")) as IFriendRequest[];
    if (!friendRequests || !friendRequests.length) {
      throw new ApiError("User not found!", 204);
    }
    return friendRequests;
  }

  async deleteFriend(data: IDeleteFriendData): Promise<string> {
    const operations = [
      {
        updateOne: {
          filter: { _id: data.userId },
          update: { $pull: { friends: data.friendId } }
        }
      }
    ];
    const result = await User.bulkWrite(operations as [], {});
    if (result.modifiedCount < 0) {
      throw new ApiError('Error while deleting friend!', 400);
    }
    return 'Friend deleted successfully!';
  }
}
