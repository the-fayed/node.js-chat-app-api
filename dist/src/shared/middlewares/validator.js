"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
const validateSchema = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(409).json({
            status: 'error',
            errors: errors.array(),
        });
    }
    next();
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validator.js.map