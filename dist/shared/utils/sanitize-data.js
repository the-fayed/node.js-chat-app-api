"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeData = void 0;
class SanitizeData {
    sanitizeUser(user) {
        return {
            id: user._id,
            username: user.username,
            avatar: user.avatar,
        };
    }
}
exports.SanitizeData = SanitizeData;
//# sourceMappingURL=sanitize-data.js.map