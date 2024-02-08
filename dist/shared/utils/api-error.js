"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.message = message;
        this.statuscode = statuscode;
        this.statuscode = statuscode;
        this.status = `${statuscode}`.startsWith('4') ? 'error' : 'fail';
    }
}
exports.default = ApiError;
//# sourceMappingURL=api-error.js.map