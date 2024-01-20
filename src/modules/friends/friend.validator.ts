import { check } from 'express-validator';

import { validateSchema } from '../../shared/middlewares/validator';
import { UserModel } from '../users/user.model';

export const validateSendFriendRequestData = [
  check('receiverId').notEmpty().withMessage('User id is required!').isMongoId().withMessage('Invalid user id!').custom((value: string, { req }) => {
    if (value === req.user.id) {
      throw new Error('You can not send a friend request to your self!');
    }
    return true;
  }).custom(async (value: string) => {
    const user = await UserModel.findOne({ _id: value })
    if (!user) {
      throw new Error('User not found!');
    }
  }),
  validateSchema
];

export const validateAcceptAndRejectFriendRequestData = [
  check("senderId")
    .notEmpty()
    .withMessage("User id is required!")
    .isMongoId()
    .withMessage("Invalid user id!")
    .custom((value: string, { req }) => {
      if (value === req.user.id) {
        throw new Error("You can not send a friend request to your self!");
      }
      return true;
    })
    .custom(async (value: string) => {
      const user = await UserModel.findOne({ _id: value });
      if (!user) {
        throw new Error("User not found!");
      }
    }),
  validateSchema,
];