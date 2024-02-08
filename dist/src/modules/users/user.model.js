"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const User = new mongoose_1.default.Schema({
    username: {
        type: String,
        min: [3, "Too short username!"],
        max: [32, "Too long username!"],
        required: true,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        min: [8, "Too weak password!"],
        max: [256, "Too long password!"],
    },
    avatar: {
        type: String,
        default: undefined,
    },
    friendRequests: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    onlineFriends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, { timestamps: true });
/**
 * hashing user password pre save and pre update
 */
User.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
User.pre("updateOne", async function () {
    const obj = this.getUpdate();
    if ("password" in obj) {
        obj.password = await bcrypt.hash(obj.password, 12);
    }
});
exports.UserModel = mongoose_1.default.model("User", User);
//# sourceMappingURL=user.model.js.map