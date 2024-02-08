"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const global_error_handling_1 = __importDefault(require("../shared/middlewares/global-error-handling"));
const routes_mounter_1 = require("../modules/routes-mounter");
const db_connection_1 = require("../config/db-connection");
const api_error_1 = __importDefault(require("../shared/utils/api-error"));
const socket_io_1 = __importDefault(require("./socket-io"));
const app = (0, express_1.default)();
const socketPort = parseInt(process.env.SOCKET_PORT);
(0, db_connection_1.dbConnection)();
/**
 * Public middlewares
 * Provided by express
 * convert incoming data to json by express.json()
 * using express.urlencoded() to handle form-data requests
 * using the "limit" property to limit the request size as a security major
 */
app.use(express_1.default.json({ limit: '30kb' }));
app.use(express_1.default.urlencoded({ extended: false, limit: '30kb' }));
/**
 * logger middleware for development environment
 * package name: morgan
 */
if (process.env.NODE_ENV === 'Development') {
    app.use((0, morgan_1.default)('dev'));
    console.log(`Environment: ${process.env.NODE_ENV}`);
}
/**
 * mount routes
 * dist: src/modules/routes-mounter.ts
 */
(0, routes_mounter_1.routesMounter)(app);
// init socket server
socket_io_1.default.listen(socketPort);
// handling not implemented routes
app.use('*', (req, res, next) => {
    throw new api_error_1.default(`Route ${req.baseUrl} not found!`, 404);
});
// using global error handler middleware
app.use(global_error_handling_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map