"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerData = exports.AnswersSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.AnswersSchema = new mongoose_1.default.Schema({
    answer: {
        type: String,
    }
});
exports.AnswerData = mongoose_1.default.model('AnswerData', exports.AnswersSchema);
