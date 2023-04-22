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
exports.getTotalHistory = exports.deleteProgressHistory = exports.getProgressHistory = exports.getProgressData = exports.compareAnswers = exports.getSingleTest = exports.getAllTests = void 0;
const TestListSchema_1 = require("../models/TestListSchema");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const tests_service_1 = require("./tests.service");
const ProgressDataSchema_1 = require("../models/ProgressDataSchema");
const CompletedTestSchema_1 = require("../models/CompletedTestSchema");
const getAllTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tests, totalTests } = yield (0, tests_service_1.getAllTestsService)(req, res);
    if (!tests) {
        throw new errors_1.NotFoundError('Cannot find any items. Try again later');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ tests, totalTests });
});
exports.getAllTests = getAllTests;
const getSingleTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: testId } = req.params;
    const testList = yield TestListSchema_1.TestList.findOne({ testId });
    if (!testList) {
        throw new errors_1.BadRequestError('Please provide correct test id');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(testList);
});
exports.getSingleTest = getSingleTest;
const compareAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerList, testId } = req.body;
    if (!answerList || !testId) {
        throw new errors_1.BadRequestError('Please provide correct data');
    }
    const testList = yield TestListSchema_1.TestList.findOne({ testId });
    if (!testList) {
        throw new errors_1.BadRequestError('Please provide correct test ID');
    }
    const { result, succeededTests } = yield testList.compareAnswers(answerList);
    if (!result) {
        throw new errors_1.BadRequestError('Cannot find any items. Try again later');
    }
    if (req.user) {
        yield (0, tests_service_1.progressDataService)(req, res, testId, succeededTests);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ succeededTests, result });
});
exports.compareAnswers = compareAnswers;
const getProgressData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errors_1.UnauthenticatedError('Please log in');
    }
    const { id: userId } = req.user;
    const progressData = yield ProgressDataSchema_1.ProgressData.findOne({ user: userId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ stats: progressData.stats });
});
exports.getProgressData = getProgressData;
const getProgressHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errors_1.UnauthenticatedError('Please log in');
    }
    const { id: userId } = req.user;
    const { tests, numOfPages } = yield (0, tests_service_1.progressHistoryService)(req, res, userId);
    res.status(http_status_codes_1.StatusCodes.OK).json({ tests, numOfPages });
});
exports.getProgressHistory = getProgressHistory;
const deleteProgressHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const { id } = req.user;
        const result = yield CompletedTestSchema_1.CompletedTest.deleteMany({ user: id });
        res.status(http_status_codes_1.StatusCodes.OK).json({ result });
    }
    else {
        throw new errors_1.BadRequestError('Please login');
    }
});
exports.deleteProgressHistory = deleteProgressHistory;
const getTotalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errors_1.UnauthenticatedError('Please log in');
    }
    const { id: userId } = req.user;
    const tests = yield CompletedTestSchema_1.CompletedTest.find({ user: userId });
    const totalTests = tests.length;
    let answers = 0;
    tests.forEach((test) => answers += +test.result);
    res.status(http_status_codes_1.StatusCodes.OK).json({ totalTests, answers });
});
exports.getTotalHistory = getTotalHistory;
