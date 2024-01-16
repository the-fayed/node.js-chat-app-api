import { check } from "express-validator";

import { validateSchema } from "../../shared/middlewares/validator";
import { UserModel as User } from "../users/user.model";

export const validateSignupData = [
  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("please provide a valid email!")
    .custom(async (value: string): Promise<void> => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use!");
      }
    }),
  check("username")
    .notEmpty()
    .withMessage("Username is required!")
    .isString()
    .withMessage("Invalid username!")
    .isLength({ min: 3, max: 32 })
    .withMessage("Username must be between 3 to 32 characters!")
    .custom(async (value: string): Promise<void> => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Unavailable username!");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isStrongPassword()
    .withMessage(
      "Week password, password must contatin an uppercase, lowercase, spicial character, number and be at least 8 numbers and characters!"
    )
    .isLength({ min: 8, max: 256 })
    .withMessage("Password length is out of range!"),
  check("passwordConfirmation").custom((value: string, { req }): boolean => {
    if (value !== req.body.password) {
      throw new Error("Password and passwor confirmation dose not match!");
    }
    return true;
  }),
  validateSchema,
];

export const validateLoginData = [
  check("email").optional().isEmail().withMessage("please provide a valid email!"),
  check("username").optional().isString().isLength({ min: 3, max: 32 }).withMessage("username length out of range!"),
  check("password")
    .notEmpty()
    .isString()
    .withMessage("Invalid password!")
    .isLength({ min: 8, max: 256 })
    .withMessage("Password length is out of range"),
  validateSchema,
];
