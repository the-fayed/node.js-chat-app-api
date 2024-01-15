import asyncHandler from "express-async-handler";

import { CreateUser, SanitizedUser, UpdateUserData, UpdateUserPassword } from "./user.interface";
import { ApiError } from "../../shared/utils/api-error";
import { AuthRequest } from '../auth/auth.interface';
import { UserService } from "./user.service";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  createUser = asyncHandler(async (req, res, next): Promise<void> => {
    const createUserData: CreateUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.file?.path
    };
    const result: SanitizedUser = await this.userService.createUser(createUserData);
    res.status(201).json({
      status: "success",
      data: result,
    });
  });

  getAllUsers = asyncHandler(async (req, res, next): Promise<void> => {
    const result: SanitizedUser[] = await this.userService.getAllUsers();
    if (!result.length) {
      throw new ApiError("", 204);
    }
    res.status(200).json({
      status: "success",
      data: result,
    });
  });

  getSpecificUser = asyncHandler(async (req, res, next): Promise<void> => {
    const result: SanitizedUser = await this.userService.getSpecificUser(req.params.id);
    res.status(200).json({ status: "success", data: result });
  });

  updateUserData = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const data: UpdateUserData = {
      id: req.user.id as string,
      username: req.body.username as string,
      email: req.body.email as string,
      avatar: req.file?.path,
    };
    const result: SanitizedUser = await this.userService.updateUserData(data);
    res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: result,
    });
  });

  updateUserPassword = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const data: UpdateUserPassword = {
      id: req.user.id,
      password: req.body.password,
    };
    const result: SanitizedUser = await this.userService.updateUserPassword(data);
    res.status(200).json({
      status: "success",
      message: "Password updated successfully!",
      data: result,
    });
  });

  deleteUser = asyncHandler(async (req, res, next): Promise<void> => {
    const result: void = await this.userService.deleteUser(req.params.id);
    res.sendStatus(203);
  });
}

const userController = new UserController();
export default userController;