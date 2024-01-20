import { CreateUser, IUser, IUserService, SanitizedUser, UpdateUserData, UpdateUserPassword } from "./user.interface";
import { uploadToCloudinary } from "../../shared/utils/code-factor";
import { SanitizeData } from "../../shared/utils/sanitize-data";
import ApiError from "../../shared/utils/api-error";
import { UserModel as User } from "./user.model";

export class UserService implements IUserService {
  private sanitizeData: SanitizeData;

  constructor() {
    this.sanitizeData = new SanitizeData();
  }

  async createUser(data: CreateUser): Promise<SanitizedUser> {
    try {
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
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while creating new account, please try again later!", 500);
    }
  }

  async getAllUsers(): Promise<SanitizedUser[]> {
    try {
      const users = (await User.find()) as IUser[];
      if (!users) {
        throw new ApiError("Error while retrieving data, please try again later!", 400);
      }
      let sanitizedUsers: SanitizedUser[] = [];
      for (const user of users) {
        sanitizedUsers.push(this.sanitizeData.sanitizeUser(user));
      }
      return sanitizedUsers;
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }

  async getUserById(id: string): Promise<SanitizedUser> {
    try {
      const user = (await User.findById(id)) as IUser;
      if (!user) {
        throw new ApiError("User not found!", 404);
      }
      return this.sanitizeData.sanitizeUser(user);
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }

  async getUserByEmailOrUsername(searchObj: string): Promise<IUser> {
    try {
      const user = (await User.findOne({
        $or: [{ email: searchObj }, { username: searchObj }],
      })) as IUser;
      if (!user) {
        throw new ApiError("User not found!", 404);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }

  async updateUserData(data: UpdateUserData): Promise<SanitizedUser> {
    try {
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
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }

  async updateUserPassword(data: UpdateUserPassword): Promise<SanitizedUser> {
    try {
      const user = (await User.findByIdAndUpdate(data.id, data)) as IUser;
      if (!user) {
        throw new ApiError("User not found!", 404);
      }
      return this.sanitizeData.sanitizeUser(user);
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new ApiError("User not found!", 404);
      }
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }
}
