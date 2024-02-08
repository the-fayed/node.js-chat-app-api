"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const online_user_model_1 = require("../modules/online-users/online-user.model");
const app_1 = __importDefault(require("./app"));
const appPort = parseInt(process.env.APP_PORT) || 3000;
const server = app_1.default.listen(appPort, () => {
    console.log(`app is running on port ${appPort}`);
});
process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection >> error: ${error.name} >> message: ${error.message}`);
    server.close(async () => {
        console.error("Shutting down ...");
        await online_user_model_1.OnlineUserModel.deleteMany();
        process.exit(1);
    });
});
exports.default = server;
//# sourceMappingURL=server.js.map