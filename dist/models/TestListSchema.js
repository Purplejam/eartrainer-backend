"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestList = exports.TestListSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TestItemSchema_1 = require("./TestItemSchema");
const TestListSchema_service_1 = require("./TestListSchema.service");
exports.TestListSchema = new mongoose_1.default.Schema({
    testId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Test',
        required: [true, 'Please provide linked test']
    },
    tests: [TestItemSchema_1.TestItemSchema]
});
exports.TestListSchema.methods.compareAnswers = function (answerList) {
    return __awaiter(this, void 0, void 0, function* () {
        const testsData = this.tests;
        const { result, succeededTests } = yield (0, TestListSchema_service_1.compareTestsService)(answerList, testsData);
        return { result, succeededTests };
    });
};
exports.TestList = mongoose_1.default.model('TestList', exports.TestListSchema);
