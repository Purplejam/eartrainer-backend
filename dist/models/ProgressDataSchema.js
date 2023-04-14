"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletedTest = exports.ProgressData = exports.ProgressDataSchema = exports.CompletedTestSchema = void 0;
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
    }
});
exports.ProgressDataSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completedTests: [exports.CompletedTestSchema],
    stats: {
        harmonic: {
            type: Number,
            default: 1
        },
        tech: {
            type: Number,
            default: 1
        },
        rhythm: {
            type: Number,
            default: 1
        },
    }
});
exports.ProgressData = mongoose_1.default.model('ProgressData', exports.ProgressDataSchema);
exports.CompletedTest = mongoose_1.default.model('CompletedTest', exports.CompletedTestSchema);
