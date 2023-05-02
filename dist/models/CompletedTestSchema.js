"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletedTest = exports.CompletedTestSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CompletedTestSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    complexity: {
        type: String
    },
    result: {
        type: String
    },
    technique: {
        type: String
    },
    quantity: {
        type: String
    },
    test: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });
exports.CompletedTest = mongoose_1.default.model('CompletedTest', exports.CompletedTestSchema);
