"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImage = void 0;
const multer_1 = __importDefault(require("multer"));
const api_error_1 = __importDefault(require("../utils/api-error"));
const multerOpts = () => {
    const storage = multer_1.default.diskStorage({
        filename(req, file, cb) {
            cb(null, file.originalname);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(new api_error_1.default("Only images allowed", 400), false);
        }
    };
    const upload = (0, multer_1.default)({ fileFilter, storage });
    return upload;
};
const uploadSingleImage = (filename) => multerOpts().single(filename);
exports.uploadSingleImage = uploadSingleImage;
//# sourceMappingURL=multer.js.map