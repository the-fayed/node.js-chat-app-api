import { check } from "express-validator";

import { validateSchema } from "../../shared/middlewares/validator";
import { UserModel as User } from "./user.model";

export const validateCreateUser = [
  check("username")
    .notEmpty()
    .withMessage("Username is required!")
    .isString()
    .withMessage("Invalid username!")
    .isLength({ min: 3, max: 32 })
    .withMessage("Username must be between 3 to 32 characters!")
    .custom(async (value: string) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Unavailable username!");
      }
    }),
  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email!")
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use!");
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isStrongPassword()
    .withMessage(
      "Password must contain uppercase, lowercase, and special character and must be at least 8 characters length long!"
    ),
  check("passwordConfirmation").custom((value: string, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password and Password confirmation does not match!");
    }
    return true;
  }),
  validateSchema,
];

export const validateGetSpecificUser = [
  check("id")
    .notEmpty()
    .withMessage("User id is required!")
    .isMongoId()
    .withMessage("Invalid user id!")
    .custom(async (value: string) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error(`No user found with id ${value}!`);
      }
    }),
  validateSchema,
];

export const validateUpdateUserData = [
  check("id")
    .notEmpty()
    .withMessage("User id is required!")
    .isMongoId()
    .withMessage("Invalid user id!")
    .custom(async (value: string) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error(`No user found with id ${value}!`);
      }
    }),
  check("username")
    .optional()
    .isString()
    .withMessage("Invalid username!")
    .isLength({ min: 3, max: 32 })
    .withMessage("Username must be between 3 to 32 characters!")
    .custom(async (value: string) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("Unavailable username!");
      }
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email!")
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use!");
      }
    }),
  validateSchema,
];

export const validateUpdateUserPassword = [
  check("id")
    .notEmpty()
    .withMessage("User id is required!")
    .isMongoId()
    .withMessage("Invalid user id!")
    .custom(async (value: string) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error(`No user found with id ${value}!`);
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isStrongPassword()
    .withMessage(
      "Password must contain uppercase, lowercase, and special character and must be at least 8 characters length long!"
    ),
  check("passwordConfirmation").custom((value: string, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password and Password confirmation does not match!");
    }
    return true;
  }),
  validateSchema,
];

export const validateDeleteUser = [
  check("id")
    .notEmpty()
    .withMessage("User id is required!")
    .isMongoId()
    .withMessage("Invalid user id!")
    .custom(async (value: string) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error(`No user found with id ${value}!`);
      }
    }),
  validateSchema,
];
