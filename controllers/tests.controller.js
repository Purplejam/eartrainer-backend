const {Test} = require('../models/TestSchema')
const {TestList} = require('../models/TestListSchema')
const {TestItem} = require('../models/TestItemSchema')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const CustomError = require('../errors/index')
const {getAllTestsService} = require('./tests.service')


const getAllTests = async (req, res) => {
	const {tests, totalTests} = await getAllTestsService(req, res)
	if (!tests) {
		throw new CustomError.NotFoundError('Cannot find any items. Try again later')
	}
	res.status(StatusCodes.OK).json({tests, totalTests})
}


const getSingleTest = async (req, res) => {
	const {id: testId} = req.params
	const testList = await TestList.findOne({testId})
	if(!testList) {
		throw new CustomError.BadRequestError('Please provide correct test id')
	}
	res.status(StatusCodes.OK).json(testList)
}


const compareAnswers = async (req, res) => {
	const {answerList, testId} = req.body
	if(!answerList || !testId) {
		throw new CustomError.BadRequestError('please provide correct data')
	}
	const testList = await TestList.findOne({testId})
	if(!testList) {
		throw new CustomError.BadRequestError('please provide correct test id')
	}

	const {result, succeededTests} = await testList.compareAnswers(answerList)
	res.status(StatusCodes.OK).json({succeededTests, result})
}


module.exports = {
	getAllTests,
	getSingleTest,
	compareAnswers
}