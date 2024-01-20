import { CreateMessageData, IMessage, IMessageService } from "./message.interface";
import { MessageModel as Message } from "./message.model";
import ApiError from "../../shared/utils/api-error";

export class MessageService implements IMessageService {
  async createMessage(data: CreateMessageData): Promise<IMessage> {
    try {
      const message = (await Message.create(data)) as unknown as IMessage;
      if (!message) {
        throw new ApiError("Error while sending your message, please try again later!", 500);
      }
      return message;
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }

  async getAllMessages(conversationId: string): Promise<IMessage[]> {
    try {
      const messages = (await Message.find({ conversationId: conversationId })) as unknown as IMessage[];
      if (!messages || !messages.length) {
        throw new ApiError("No messages found!", 403);
      }
      return messages;
    } catch (error) {
      console.log(error);
      throw new ApiError("Error while retrieving data, please try again later!", 500);
    }
  }
}
