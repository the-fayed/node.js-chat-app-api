export interface AddOnlineUser {
  userId: string;
  socketId: string;
}

export interface IOnlineUser extends Document {
  userId: string;
  socketId: string;
}

export interface IOnlineUserService {
  getAllOnlineUsers: () => Promise<IOnlineUser[]>;
  getOnlineUser: (userId: string) => Promise<IOnlineUser>;
  addOnlineUser: (data: AddOnlineUser) => Promise<void>;
  deleteOnlineUser: (socketId: string) => Promise<void>;
}

export interface ISocketMessage {
  senderId: string,
  receiverId: string,
  content: string;
}
