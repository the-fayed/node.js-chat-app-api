export interface FriendRequestData {
  senderId: string;
  receiverId: string;
}

export interface IFriend {
  friend: {
    username: string;
    avatar: string;
  };
};

export interface IFriendRequest {
  friendRequest: {
    username: string;
    avatar: string;
  }
}

export interface IDeleteFriendData {
  userId: string;
  friendId: string;
}

export interface IFriendService {
  sendFriendRequest: (data: FriendRequestData) => Promise<string>;
  cancelFriendRequest: (data: FriendRequestData) => Promise<string>;
  acceptFriendRequest: (data: FriendRequestData) => Promise<string>;
  rejectFriendRequest: (data: FriendRequestData) => Promise<string>;
  getAllFriends: (userId: string) => Promise<IFriend[]>;
  getAllFriendRequests: (userId: string) => Promise<IFriendRequest[]>
  deleteFriend: (data: IDeleteFriendData) => Promise<string>
}
