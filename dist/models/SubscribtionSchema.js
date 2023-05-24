"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribtion = exports.SubscribtionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.SubscribtionSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.Subscribtion = mongoose_1.default.model('Subscribtion', exports.SubscribtionSchema);
