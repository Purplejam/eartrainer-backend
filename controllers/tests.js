const {Test, TestList, TestItem} = require('../models/Test')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const CustomError = require('../errors/index')


const getAllTests = async (req, res) => {
	const {technique, complexity, sorting} = req.query

	let queryObject = {}

 if (complexity && complexity !== '' && complexity !== 'Все') {
 	if (complexity === 'Новичок') {
 		queryObject.complexity = {$gt: 1, $lt: 5}
 	}
 	else if (complexity === 'Средний') {
 		console.log(true)
 		queryObject.complexity = {$gt: 3, $lt: 6}
 	}
 	else if (complexity === 'Продвинутый') {
 		queryObject.complexity = {$gt: 5}
 	}
 	else {
 		console.log(true)
 		queryObject.complexity = {$gt: 0}
 	} 
 }

 if (technique && technique !== '' && technique !== 'Все') {
 	queryObject.technique = technique
 }
 

 let result = Test.find(queryObject)

	if (sorting && sorting !== '') {
		if (sorting === 'Сначала новые') {
			result = result.sort('-createdAt')
		}
		else if (sorting === 'Сначала старые') {
			result = result.sort('createdAt')
		}
		else if (sorting === 'Сначала простые') {
			result = result.sort('complexity')
		}
		else if (sorting === 'Сначала сложные') {
			result = result.sort('-complexity')
		}
		else {
			result = result.sort('createdAt')
		}
	} 

	let tests = await result

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