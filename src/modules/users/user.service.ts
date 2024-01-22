import { Query } from "mongoose";

import { CreateUser, IUser, IUserService, SanitizedUser, UpdateUserData, UpdateUserPassword } from "./user.interface";
import { uploadToCloudinary } from "../../shared/utils/code-factor";
import { ApiFeatureResponse, IQueryString } from "../../shared/utils/utils.interface";
import { SanitizeData } from "../../shared/utils/sanitize-data";
import { ApiFeature } from "../../shared/utils/api-feature";
import ApiError from "../../shared/utils/api-error";
import { UserModel as User } from "./user.model";

export class UserService implements IUserService {
  private sanitizeData: SanitizeData;

  constructor() {
    this.sanitizeData = new SanitizeData();
  }

  async createUser(data: CreateUser): Promise<SanitizedUser> {
    data.avatar = data.avatar
      ? await uploadToCloudinary(data.avatar, {
          format: "jpg",
          public_id: `${Date.now()}-avatar`,
          folder: "/users/avatars",
        })
      : undefined;
    const user = (await User.create(data)) as IUser;
    if (!user) {
      throw new ApiError("Error while creating new account, please try again later!", 400);
    }
    return this.sanitizeData.sanitizeUser(user);
  }

  async getAllUsers(reqQuery: IQueryString): Promise<ApiFeatureResponse> {
    const documentCount: number = await User.countDocuments();
    const apiFeature = new ApiFeature(User.find({}) as unknown as Query<IUser[], IUser>, reqQuery)
      .paginate(documentCount)
      .sort()
      .search();
    const { MongooseQuery, PaginationResult } = apiFeature;
    const users = await MongooseQuery;
    let sanitizeUsers: SanitizedUser[] = [];
    for (let user of users) {
      const sanitizeUser = this.sanitizeData.sanitizeUser(user);
      sanitizeUsers.push(sanitizeUser);
    }
    return { documents: sanitizeUsers, paginationResults: PaginationResult };
  }

  async getUserById(id: string): Promise<SanitizedUser> {
    const user = (await User.findById(id)) as IUser;
    if (!user) {
      throw new ApiError("User not found!", 404);
    }
    return this.sanitizeData.sanitizeUser(user);
  }

  async getUserByEmailOrUsername(searchObj: string): Promise<IUser> {
    const user = (await User.findOne({
      $or: [{ email: searchObj }, { username: searchObj }],
    })) as IUser;
    if (!user) {
      throw new ApiError("User not found!", 404);
    }
    return user;
  }

  async updateUserData(data: UpdateUserData): Promise<SanitizedUser> {
    data.avatar = data.avatar
      ? await uploadToCloudinary(data.avatar, {
          format: "jpg",
          public_id: `${Date.now()}-avatar`,
          folder: "/users/avatars",
        })
      : undefined;
    const user = (await User.findByIdAndUpdate(data.id, data)) as IUser;
    if (!user) {
      throw new ApiError("User not found!", 404);
    }
    return this.sanitizeData.sanitizeUser(user);
  }

  async updateUserPassword(data: UpdateUserPassword): Promise<SanitizedUser> {
    const user = (await User.findByIdAndUpdate(data.id, data)) as IUser;
    if (!user) {
      throw new ApiError("User not found!", 404);
    }
    return this.sanitizeData.sanitizeUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new ApiError("User not found!", 404);
    }
  }
}
