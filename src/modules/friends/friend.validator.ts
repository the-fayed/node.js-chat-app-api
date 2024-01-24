import { check } from 'express-validator';

import { validateSchema } from '../../shared/middlewares/validator';
import { UserModel } from '../users/user.model';

export const validateSendOrCancelFriendRequestData = [
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

export const validateDeleteFriendData = [
  check('friendId').notEmpty().withMessage('Friend id is required!').custom(async(value: string, {req}) => {
    const friend = await UserModel.findOne({ $and: [{ _id: req.user.id }, { friends: { $in: value } }] });
    if (!friend) {
      throw new Error('You are not friend with this user!');
    }
  }),
  validateSchema,
]