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
exports.compareAnswers = exports.getSingleTest = exports.getAllTests = void 0;
const TestSchema_1 = require("../models/TestSchema");
const TestListSchema_1 = require("../models/TestListSchema");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const tests_service_1 = require("./tests.service");
const ProgressDataSchema_1 = require("../models/ProgressDataSchema");
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
        throw new errors_1.BadRequestError('Please provide correct test id');
    }
    const { result, succeededTests } = yield testList.compareAnswers(answerList);
    if (!result) {
        throw new errors_1.BadRequestError('Cannot find any items. Try again later');
    }
    if (req.user) {
        const progressData = yield ProgressDataSchema_1.ProgressData.findOne({ user: req.user.id });
        const test = yield TestSchema_1.Test.findOne({ _id: testId });
        console.log(test);
        const completedTest = yield ProgressDataSchema_1.CompletedTest.create({
            name: test.name,
            slug: test.slug,
            complexity: test.complexity,
            result: succeededTests,
            test: test.id
        });
        console.log(completedTest);
        progressData.completedTests.push(completedTest);
        yield progressData.save();
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ succeededTests, result });
});
exports.compareAnswers = compareAnswers;
