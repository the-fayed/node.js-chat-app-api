import asyncHandler from 'express-async-handler';

import { FriendRequestData } from './friend.interface';
import { AuthRequest } from '../auth/auth.interface';
import { FriendService } from './friend.service';

class FriendController {
  private friendService: FriendService;

  constructor() {
    this.friendService = new FriendService
  }

  sendFriendRequest = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const friendRequestData: FriendRequestData = {
      senderId: req.user.id,
      receiverId: req.body.receiverId
    };
    const result = await this.friendService.sendFriendRequest(friendRequestData);
    res.status(201).json({
      status: 'success',
      data: result,
    });
  });

  acceptFriendRequest = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const friendRequestData: FriendRequestData = {
      receiverId: req.user.id,
      senderId: req.body.senderId,
    };
    const result = await this.friendService.acceptFriendRequest(friendRequestData);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  });

  rejectFriendRequest = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const friendRequestData: FriendRequestData = {
      receiverId: req.user.id,
      senderId: req.body.senderId,
    };
    const result = await this.friendService.rejectFriendRequest(friendRequestData);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  });

  getAllFriendRequests = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const result = await this.friendService.getAllFriendRequests(req.user.id);
    res.status(200).json({
      status: 'success',
      data: result
    });
  });

  getAllFriends = asyncHandler(async (req: AuthRequest, res, next): Promise<void> => {
    const result = await this.friendService.getAllFriends(req.user.id);
    res.status(200).json({
      status: 'success',
      data: result,
    })
  })
}

const friendController = new FriendController();
export default friendController;