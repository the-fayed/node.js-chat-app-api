import { CreateConversationData, IConversation, IConversationService } from "./conversation.interface";
import { ConversationModel as Conversation } from "./conversation.model";
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

  async getConversations(userId: string): Promise<IConversation[]> {
      const conversations = (await Conversation.find({ members: { $in: userId } })) as unknown as IConversation[];
      if (!conversations || !conversations.length) {
        throw new ApiError("No conversation found!", 403);
      }
      return conversations;
  }
}
