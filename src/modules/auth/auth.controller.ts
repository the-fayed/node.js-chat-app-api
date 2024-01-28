import asyncHandler from "express-async-handler";
import { AuthService } from "./auth.service";
import { LoginData, SignupData } from "./auth.interface";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signup = asyncHandler(async (req, res, next): Promise<void> => {
    const signupData: SignupData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      avatar: req.file?.path,
    };
    const result = await this.authService.signup(signupData);
    res.status(201).json({
      status: "success",
      data: result.user,
      access_token: result.accessToken,
    });
  });

  login = asyncHandler(async (req, res, next): Promise<void> => {
    const loginData: LoginData = {
      emailOrUsername: req.body.emailOrUsername,
      password: req.body.password,
    };
    const result = await this.authService.login(loginData);
    res.status(200).json({
      status: "success",
      data: result.user,
      access_token: result.accessToken,
    });
  });
}

const authController = new AuthController();

export default authController;
