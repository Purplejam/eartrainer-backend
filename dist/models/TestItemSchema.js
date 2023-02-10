"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestItem = exports.TestItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { AnswersSchema } = require('./AnswersItemSchema');
exports.TestItemSchema = new mongoose_1.default.Schema({
    audio: {
        type: String,
    },
    question: {
        type: String,
    },
    correct: {
        type: String
    },
    answers: [AnswersSchema]
});
exports.TestItemSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.correct;
    return obj;
};
exports.TestItemSchema.methods.showAnswer = function () {
    return this.correct;
};
exports.TestItem = mongoose_1.default.model('TestItem', exports.TestItemSchema);
