import * as bcrypt from "bcrypt";

import { IAuthService, LoginData, AuthResponse, SignupData } from "./auth.interface";
import { generateAccessToken } from "../../shared/utils/code-factor";
import { SanitizeData } from "../../shared/utils/sanitize-data";
import ApiError from "../../shared/utils/api-error";
import { UserService } from "../users/user.service";

export class AuthService implements IAuthService {
  private sanitizeData: SanitizeData;
  private userService: UserService;

  constructor() {
    this.sanitizeData = new SanitizeData();
    this.userService = new UserService();
  }

  async signup(data: SignupData): Promise<AuthResponse> {
      const user = await this.userService.createUser(data);
      if (!user) {
        throw new ApiError("Error while creating your account, please try again later!", 500);
      }
      const token = generateAccessToken({ userId: user.id });
      return {
        user: user,
        accessToken: token,
      };
  }

  async login(data: LoginData): Promise<AuthResponse> {
      // check if user exists
      const user = data.email
        ? await this.userService.getUserByEmailOrUsername(data.email)
        : await this.userService.getUserByEmailOrUsername(data.username);
      if (!user) {
        throw new ApiError("Invalid credentials!", 401);
      }
      // check if the password matches
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      if (!passwordMatch) {
        throw new ApiError("Invalid credentials!", 401);
      }
      // preparing the response data
      const token = generateAccessToken({ userId: user.id });
      return { user: this.sanitizeData.sanitizeUser(user), accessToken: token };
  }
}
