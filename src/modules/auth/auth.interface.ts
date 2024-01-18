import { Request } from "express";

import { IUser, SanitizedUser } from "../users/user.interface";

export interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
  avatar?: string;
}

export interface AuthResponse {
  user: SanitizedUser;
  accessToken: string;
}

export interface IAuthService {
  login: (data: LoginData) => Promise<AuthResponse>;
  signup: (data: SignupData) => Promise<AuthResponse>;
}

export interface AuthRequest extends Request {
  user: IUser;
}

export interface Payload {
  userId: string;
}

export interface Decoded {
  userId: string;
  iat: number;
  exp: number;
}
