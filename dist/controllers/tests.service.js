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
exports.getAllTestsService = void 0;
const { Test } = require('../models/TestSchema');
const { TestList } = require('../models/TestListSchema');
const { TestItem } = require('../models/TestItemSchema');
const { testDataMap } = require('../models/testDataMap');
const getAllTestsService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { technique, complexity, name } = req.query;
    let queryObject = {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    if (complexity && complexity !== '' && complexity !== 'Все') {
        if (testDataMap.has(complexity)) {
            queryObject.complexity = testDataMap.get(complexity);
        }
        else {
            queryObject.complexity = { $gt: 0 };
        }
    }
    if (technique && technique !== '' && technique !== 'Все') {
        queryObject.technique = technique;
    }
    if (name && name !== '') {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    let result = Test.find(queryObject);
    if (req.query.sorting && req.query.sorting !== '') {
        if (testDataMap.has(req.query.sorting)) {
            result = result.sort(testDataMap.get(req.query.sorting));
        }
    }
    else {
        result = result.sort('complexity');
    }
    result = result.skip(skip).limit(limit);
    const tests = yield result;
    const totalTests = yield Test.countDocuments(queryObject);
    return { tests, totalTests };
});
exports.getAllTestsService = getAllTestsService;