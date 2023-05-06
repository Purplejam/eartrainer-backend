"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const testsRouter_1 = __importDefault(require("./routes/testsRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
exports.app.set('trust proxy', 1);
exports.app.use((0, cors_1.default)({
    origin: 'https://eartrainer-v2-frontend.vercel.app',
    credentials: true
}));
exports.app.use(express_1.default.static('public'));
exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, './client/build')));
exports.app.use('/api/v1/tests', testsRouter_1.default);
exports.app.use('/api/v1/auth', authRouter_1.default);
exports.app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, './client/build', 'index.html'));
});
exports.app.use(notFound_1.notFoundMiddleware);
exports.app.use(errorHandler_1.errorHandlerMiddleware);
