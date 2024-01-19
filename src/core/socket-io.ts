import { createServer } from 'http';

import { Server } from "socket.io";

import { OnlineUserService } from "../modules/online-users/online-user.service";
import { ISocketMessage } from "../modules/online-users/online-user.interface";
import app from "./app";

const onlineUserService = new OnlineUserService();

// init socket.io server
const server = createServer(app);
const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("a user connected!");
  socket.on("connection", async (userId: string) => {
    // save the connection to the database
    await onlineUserService.addOnlineUser({ userId: userId, socketId: socket.id });
  });

  // returning all online users to filter them and find every user's online friends
  const onlineUsers = await onlineUserService.getAllOnlineUsers();
  io.emit("getOnlineUsers", onlineUsers);

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
