import { check } from 'express-validator';
import { ConversationModel as Conversation } from '../conversations/conversation.model';
import { UserModel as User } from '../users/user.model';
import { validateSchema } from '../../shared/middlewares/validator';

export const validateSendMessage = [
  check('conversationId').notEmpty().withMessage('ConversationId is required!').isMongoId().withMessage('Invalid Conversation id!').custom(async (value: string) => {
    const conversation = await Conversation.findOne({ _id: value });
    if (!conversation) {
      throw new Error('Conversation not found!');
    }
  }),
  check('receiverId').notEmpty().withMessage('Message receiver id is required!').isMongoId().withMessage('Invalid user id!').custom(async (value: string, { req }) => {
    const user = await User.findOne({ _id: value });
    if(!user || req.user.id === value) {
      throw new Error('User not found!');
    }
    return true;
  }),
  validateSchema,
]