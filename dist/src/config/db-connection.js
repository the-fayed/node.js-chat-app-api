"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
        console.log('DB connected successfully!');
    }).catch((error) => {
        console.log(error);
    });
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=db-connection.js.map