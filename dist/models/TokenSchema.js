"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.TokenSchema = new mongoose_1.default.Schema({
    refreshToken: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
exports.Token = mongoose_1.default.model('Token', exports.TokenSchema);
