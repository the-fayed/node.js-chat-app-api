"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const online_user_service_1 = require("../modules/online-users/online-user.service");
const app_1 = __importDefault(require("./app"));
const onlineUserService = new online_user_service_1.OnlineUserService();
// getting all online users
async function getAllOnlineUsers() {
    return await onlineUserService.getAllOnlineUsers();
}
// init socket.io server
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server);
io.on("connection", async (socket) => {
    console.log("a user connected!");
    socket.on("connection", async (userId) => {
        // save the connection to the database
        await onlineUserService.addOnlineUser({ userId: userId, socketId: socket.id });
    });
    // returning all online users to filter them and find every user's online friends
    io.emit("getOnlineUsers", await getAllOnlineUsers());
    // handling sending messages
    socket.on("sendMessage", async ({ ...data }) => {
        const user = await onlineUserService.getOnlineUser(data.receiverId);
        io.to(user.socketId).emit("getMessage", { senderId: data.senderId, content: data.content });
    });
    // removing connection from database
    socket.on("disconnect", async () => {
        console.log('a user disconnected');
        await onlineUserService.deleteOnlineUser(socket.id);
    });
});
exports.default = io;
//# sourceMappingURL=socket-io.js.map