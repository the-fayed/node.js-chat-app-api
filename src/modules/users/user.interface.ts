import { Document } from "mongoose";

import { ApiFeatureResponse } from '../../shared/utils/utils.interface';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
}

export interface CreateUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UpdateUserData {
  id: string;
  username? : string;
  email: string;
  avatar: string;
}

export interface UpdateUserPassword {
  id: string;
  password: string;
}

export interface IUserService {
  createUser: (data: CreateUser) => Promise<SanitizedUser>;
  getAllUsers: (reqQuery: any) => Promise<ApiFeatureResponse>;
  getUserById: (id: string) => Promise<SanitizedUser>;
  getUserByEmailOrUsername: (searchObj: string) => Promise<IUser>
  updateUserData: (data: UpdateUserData) => Promise<SanitizedUser>;
  updateUserPassword: (data: UpdateUserPassword) => Promise<SanitizedUser>;
  deleteUser: (id: string) => Promise<void>;
}

export interface SanitizedUser {
  id: string;
  username: string;
  avatar: string;
}
