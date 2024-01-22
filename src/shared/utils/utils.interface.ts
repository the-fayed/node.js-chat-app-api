import { IConversation } from '../../modules/conversations/conversation.interface';
import { IOnlineUser } from '../../modules/online-users/online-user.interface';
import { IMessage } from '../../modules/messages/message.interface';
import { SanitizedUser } from '../../modules/users/user.interface';
import { IFriend } from '../../modules/friends/friend.interface';

export interface CloudinaryUploadOpt {
  format: 'string';
}

export interface IPagination {
  current: number;
  numberOfPages: number;
  next?: number;
  prev?: number;
}

export interface IQueryString {
  page?: string;
  size?: string;
  keyword?: string;
  sort?: string;
}

export interface SearchObj {
  username: { $regex: string, $options: 'i' }
}

export interface ApiFeatureResponse {
  paginationResults: IPagination;
  documents: SanitizedUser[] | IOnlineUser[] | IFriend[] | IConversation[] | IMessage[];
}