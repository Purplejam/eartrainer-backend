"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.TestSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.TestSchema = new mongoose_1.default.Schema({
    slug: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    technique: {
        type: String,
    },
    complexity: {
        type: Number,
    },
    description: {
        type: String,
    }
}, { timestamps: true });
exports.Test = mongoose_1.default.model('Test', exports.TestSchema);
