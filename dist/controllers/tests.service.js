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
exports.getTotalHistoryService = exports.progressHistoryService = exports.progressDataService = exports.getAllTestsService = void 0;
const TestSchema_1 = require("../models/TestSchema");
const testDataMap_1 = require("../models/testDataMap");
const ProgressDataSchema_1 = require("../models/ProgressDataSchema");
const CompletedTestSchema_1 = require("../models/CompletedTestSchema");
const techMap_1 = require("../models/techMap");
const getAllTestsService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { technique, complexity, name } = req.query;
    let queryObject = {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    if (complexity && complexity !== '' && complexity !== 'All') {
        if (testDataMap_1.testDataMapComplexity.has(complexity)) {
            queryObject.complexity = testDataMap_1.testDataMapComplexity.get(complexity);
        }
        else {
            queryObject.complexity = { $gt: 0 };
        }
    }
    if (technique && technique !== '' && technique !== 'All') {
        queryObject.technique = technique;
    }
    if (name && name !== '') {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    let result = TestSchema_1.Test.find(queryObject);
    if (req.query.sorting && req.query.sorting !== '') {
        if (testDataMap_1.testDataMapSorting.has(req.query.sorting)) {
            result = result.sort(testDataMap_1.testDataMapSorting.get(req.query.sorting));
        }
    }
    else {
        result = result.sort('complexity');
    }
    result = result.skip(skip).limit(limit);
    const tests = yield result;
    const totalTests = yield TestSchema_1.Test.countDocuments(queryObject);
    return { tests, totalTests };
});
exports.getAllTestsService = getAllTestsService;
const progressDataService = (req, res, testId, succeededTests) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const progressData = yield ProgressDataSchema_1.ProgressData.findOne({ user: req.user.id });
        const test = yield TestSchema_1.Test.findOne({ _id: testId });
        const completedTest = yield CompletedTestSchema_1.CompletedTest.create({
            name: test.name,
            slug: test.slug,
            complexity: test.complexity,
            result: succeededTests,
            technique: test.technique,
            test: test.id,
            user: req.user.id
        });
        if (techMap_1.techiqueMap.has(test.technique)) {
            const technique = techMap_1.techiqueMap.get(test.technique);
            const stats = progressData.stats[`${technique}`];
            if (stats === 10) {
                return;
            }
            if (succeededTests >= 14 && test.complexity > stats) {
                if (succeededTests >= 17) {
                    progressData.stats[`${technique}`] = test.complexity;
                }
                if (succeededTests < 17) {
                    progressData.stats[`${technique}`] += 0.5;
                }
            }
            else if (succeededTests >= 17 && stats - test.complexity <= 2) {
                progressData.stats[`${technique}`] += 0.25;
            }
        }
        yield progressData.save();
    }
});
exports.progressDataService = progressDataService;
const progressHistoryService = (req, res, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const perPage = 6;
    const skip = (+page - 1) * perPage;
    const totalTests = yield CompletedTestSchema_1.CompletedTest.countDocuments({ user: userId });
    const numOfPages = Math.ceil(totalTests / perPage);
    let tests = CompletedTestSchema_1.CompletedTest.find({ user: userId });
    tests = tests.sort('-createdAt').skip(skip).limit(perPage);
    tests = yield tests;
    return { tests, numOfPages };
});
exports.progressHistoryService = progressHistoryService;
const getTotalHistoryService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tests = yield CompletedTestSchema_1.CompletedTest.find({ user: userId });
    const totalTests = tests.length;
    let answers = 0;
    tests.forEach((test) => answers += +test.result);
    return { totalTests, answers };
});
exports.getTotalHistoryService = getTotalHistoryService;
