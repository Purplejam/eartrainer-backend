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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompletedTestRepository = exports.getProgressDataRepository = exports.getSingleTestListRepository = exports.getSingleTestRepository = void 0;
const CompletedTestSchema_1 = require("../models/CompletedTestSchema");
const ProgressDataSchema_1 = require("../models/ProgressDataSchema");
const TestListSchema_1 = require("../models/TestListSchema");
const TestSchema_1 = require("../models/TestSchema");
const getSingleTestRepository = (testId) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield TestSchema_1.Test.findOne({ _id: testId });
    return test;
});
exports.getSingleTestRepository = getSingleTestRepository;
const getSingleTestListRepository = (testId) => __awaiter(void 0, void 0, void 0, function* () {
    const testList = yield TestListSchema_1.TestList.findOne({ testId });
    return testList;
});
exports.getSingleTestListRepository = getSingleTestListRepository;
const getProgressDataRepository = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const progressData = yield ProgressDataSchema_1.ProgressData.findOne({ user: userId });
    return progressData;
});
exports.getProgressDataRepository = getProgressDataRepository;
const deleteCompletedTestRepository = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield CompletedTestSchema_1.CompletedTest.deleteMany({ user: id });
    return result;
});
exports.deleteCompletedTestRepository = deleteCompletedTestRepository;
