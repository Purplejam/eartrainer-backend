const {Test, TestList, TestItem} = require('../models/Test')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const CustomError = require('../errors/index')


const getAllTests = async (req, res) => {
	const {name, technique, complexity} = req.body
	let queryObject = {}
 if (name) queryObject.name = name
 if (technique) queryObject.technique = technique
 if (complexity) queryObject.complexity = complexity

	let tests = await Test.find(queryObject)
	res.status(StatusCodes.OK).json(tests)
}


const getSingleTest = async (req, res) => {
	const {id: testId} = req.params
	const testList = await TestList.findOne({testId})

	if(!testList) {
		throw new CustomError.BadRequestError('please provide correct test id')
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