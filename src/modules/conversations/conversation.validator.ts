import { check } from 'express-validator';

import { validateSchema } from '../../shared/middlewares/validator';
import { UserModel as User } from '../users/user.model';

export const validateCreateConversationData = [
  check('receiverId').notEmpty().withMessage('Receiver id is required!').isMongoId().withMessage('Invalid receiver id!').custom(async(value: string): Promise<void> => {
    const user = await User.findOne({ _id: value});
    if (!user) {
      throw new Error('User not found!');
    }
  }),
  validateSchema,
];