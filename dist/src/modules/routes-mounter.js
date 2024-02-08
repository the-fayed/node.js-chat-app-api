"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesMounter = void 0;
const conversation_routes_1 = __importDefault(require("./conversations/conversation.routes"));
const message_routes_1 = __importDefault(require("./messages/message.routes"));
const friend_routes_1 = __importDefault(require("./friends/friend.routes"));
const user_routes_1 = __importDefault(require("./users/user.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const routesMounter = (app) => {
    app.use('/api/v1/conversations', conversation_routes_1.default);
    app.use('/api/v1/messages', message_routes_1.default);
    app.use('/api/v1/friends', friend_routes_1.default);
    app.use('/api/v1/users', user_routes_1.default);
    app.use('/api/v1/auth', auth_routes_1.default);
};
exports.routesMounter = routesMounter;
//# sourceMappingURL=routes-mounter.js.map