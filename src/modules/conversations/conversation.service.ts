import { Query } from "mongoose";

import { CreateConversationData, IConversation, IConversationService } from "./conversation.interface";
import { ApiFeatureResponse, IQueryString } from "../../shared/utils/utils.interface";
import { ConversationModel as Conversation } from "./conversation.model";
import { ApiFeature } from "../../shared/utils/api-feature";
import { UserModel as User } from "../users/user.model";
import ApiError from "../../shared/utils/api-error";

export class ConversationService implements IConversationService {
  async createNewConversation(data: CreateConversationData): Promise<IConversation> {
    let conversation: IConversation;
    // check if conversation already exists
    conversation = (await Conversation.findOne({
      $or: [{ members: [data.senderId, data.receiverId] }, { members: [data.receiverId, data.senderId] }],
    })) as unknown as IConversation;
    if (conversation) {
      return conversation;
      // creating conversation if not existing
    } else {
      // checking if sender and receiver are friends
      const receiver = await User.findOne({ _id: data.receiverId });
      if (data.senderId in receiver.friends) {
        conversation = (await Conversation.create({
          members: [data.senderId, data.receiverId],
        })) as unknown as IConversation;
        if (!conversation) {
          throw new ApiError("Error while creating conversation!", 500);
        }
        return conversation;
      } else {
        throw new ApiError("You can only start conversations with your friends!", 400);
      }
    }
  }

  async getConversations(userId: string, reqQuery: IQueryString): Promise<ApiFeatureResponse> {
    const documentsCount: number = await Conversation.countDocuments({ members: { $in: userId } });
    const apiFeature = new ApiFeature(
      Conversation.find({ members: { $in: userId } }) as unknown as Query<IConversation[], IConversation>,
      reqQuery
    )
      .paginate(documentsCount)
      .sort();
    const { MongooseQuery, PaginationResult } = apiFeature;
    const conversations = await MongooseQuery;
    const paginationResults = PaginationResult;
    return { documents: conversations, paginationResults };
  }
}
