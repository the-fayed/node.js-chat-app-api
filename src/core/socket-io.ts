import { Server } from "socket.io";

import { OnlineUserService } from "../modules/online-users/online-user.service";
import { ISocketMessage } from "../modules/online-users/online-user.interface";
import server from "./server";

const onlineUserService = new OnlineUserService();

// init socket.io server
const io = new Server(server, { connectionStateRecovery: {} });

io.on("connection", (socket) => {
  console.log("a user connected!");
  socket.on("connection", async (userId: string) => {
    // save the connection to the database
    await onlineUserService.addOnlineUser({ userId: userId, socketId: socket.id });
  });

  // returning all online users to filter them and find every user's online friends
  io.emit("getOnlineUsers", async () => {
    return await onlineUserService.getAllOnlineUsers();
  });

  // handling sending messages
  socket.on("sendMessage", async (data: ISocketMessage) => {
    const user = await onlineUserService.getOnlineUser(data.receiverId);
    if (!user) throw new Error(`The receiver is not available.`);
    io.to(user.socketId).emit("getMessage", { senderId: data.senderId, content: data.content });
  });

  // removing connection from database
  socket.on("disconnect", async () => {
    await onlineUserService.deleteOnlineUser(socket.id);
  });
});
