import { Query } from "mongoose";

import { ApiFeatureResponse, IQueryString } from "../../shared/utils/utils.interface";
import { CreateMessageData, IMessage, IMessageService } from "./message.interface";
import { ApiFeature } from "../../shared/utils/api-feature";
import { MessageModel as Message } from "./message.model";
import ApiError from "../../shared/utils/api-error";

export class MessageService implements IMessageService {
  async createMessage(data: CreateMessageData): Promise<IMessage> {
    const message = (await Message.create(data)) as unknown as IMessage;
    if (!message) {
      throw new ApiError("Error while sending your message, please try again later!", 500);
    }
    return message;
  }

  async getAllMessages(conversationId: string, reqQuery: IQueryString): Promise<ApiFeatureResponse> {
    const documentCount: number = await Message.countDocuments({ conversationId });
    const apiFeature = new ApiFeature(
      Message.find({ conversationId }) as unknown as Query<IMessage[], IMessage>,
      reqQuery
    )
      .paginate(documentCount)
      .sort()
      .search();
    const { MongooseQuery, PaginationResult } = apiFeature;
    const messages = await MongooseQuery;
    if (!messages || !messages.length) {
      throw new ApiError("No messages found!", 204);
    }
    return { documents: messages, paginationResults: PaginationResult };
  }
}
