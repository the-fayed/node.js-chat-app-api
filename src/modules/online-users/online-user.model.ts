import mongoose, { Schema } from 'mongoose';

const onlineUserSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  }
})

export const OnlineUserModel = mongoose.model('OnlineUser', onlineUserSchema);