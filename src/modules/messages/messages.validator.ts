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
  validateSchema,
]