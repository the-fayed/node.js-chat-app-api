import { Server } from "socket.io";

import { OnlineUserService } from "../modules/online-users/online-user.service";
import { ISocketMessage } from "../modules/online-users/online-user.interface";
import server from './server';

const onlineUserService = new OnlineUserService();

// getting all online users
async function getAllOnlineUsers() {
  return await onlineUserService.getAllOnlineUsers();
}

// init socket.io server
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("a user connected!");
  socket.on("connection", async (userId: string) => {
    // save the connection to the database
    await onlineUserService.addOnlineUser({ userId: userId, socketId: socket.id });
  });

  // returning all online users to filter them and find every user's online friends
  io.emit("getOnlineUsers", await getAllOnlineUsers());

  // handling sending messages
  socket.on("sendMessage", async ({...data}: ISocketMessage) => {
    const user = await onlineUserService.getOnlineUser(data.receiverId);
    io.to(user.socketId).emit("getMessage", { senderId: data.senderId, content: data.content });
  });

  // removing connection from database
  socket.on("disconnect", async () => {
    console.log('a user disconnected');
    await onlineUserService.deleteOnlineUser(socket.id);
  });
});

export default io;
