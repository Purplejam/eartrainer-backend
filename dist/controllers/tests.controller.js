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
const { Test } = require('../models/TestSchema');
const { TestList } = require('../models/TestListSchema');
const { TestItem } = require('../models/TestItemSchema');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const CustomError = require('../errors/index');
const { getAllTestsService } = require('./tests.service');
const getAllTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tests, totalTests } = yield getAllTestsService(req, res);
    if (!tests) {
        throw new CustomError.NotFoundError('Cannot find any items. Try again later');
    }
    res.status(StatusCodes.OK).json({ tests, totalTests });
});
exports.getAllTests = getAllTests;
const getSingleTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: testId } = req.params;
    const testList = yield TestList.findOne({ testId });
    if (!testList) {
        throw new CustomError.BadRequestError('Please provide correct test id');
    }
    res.status(StatusCodes.OK).json(testList);
});
exports.getSingleTest = getSingleTest;
const compareAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerList, testId } = req.body;
    if (!answerList || !testId) {
        throw new CustomError.BadRequestError('Please provide correct data');
    }
    const testList = yield TestList.findOne({ testId });
    if (!testList) {
        throw new CustomError.BadRequestError('Please provide correct test id');
    }
    const { result, succeededTests } = yield testList.compareAnswers(answerList);
    if (!result) {
        throw new CustomError.BadRequestError('Cannot find any items. Try again later');
    }
    res.status(StatusCodes.OK).json({ succeededTests, result });
});
exports.compareAnswers = compareAnswers;
