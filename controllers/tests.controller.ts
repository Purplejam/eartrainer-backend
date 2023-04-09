import {Test} from '../models/TestSchema'
import {TestList} from '../models/TestListSchema'
import {TestItem} from '../models/TestItemSchema'
import {StatusCodes} from 'http-status-codes'
import mongoose from 'mongoose'
import {CustomAPIError, BadRequestError, NotFoundError} from '../errors'
import {getAllTestsService} from './tests.service'
import {Request, Response} from 'express'
import { CompletedTest, ProgressData } from '../models/ProgressDataSchema';

export const getAllTests = async (req: Request, res: Response): Promise<void> => {
	const {tests, totalTests} = await getAllTestsService(req, res)
	if (!tests) {
		throw new NotFoundError('Cannot find any items. Try again later')
	}
	res.status(StatusCodes.OK).json({tests, totalTests})
}


export const getSingleTest = async (req: Request, res: Response): Promise<void>  => {
	const {id: testId} = req.params
	const testList = await TestList.findOne({testId})
	if(!testList) {
		throw new BadRequestError('Please provide correct test id')
	}
	res.status(StatusCodes.OK).json(testList)
}


export const compareAnswers = async (req: Request, res: Response): Promise<void>  => {
	const {answerList, testId} = req.body
	if(!answerList || !testId) {
		throw new BadRequestError('Please provide correct data')
	}
	const testList = await TestList.findOne({testId})
	if(!testList) {
		throw new BadRequestError('Please provide correct test id')
	}
	const {result, succeededTests} = await testList.compareAnswers(answerList)
	if(!result) {
		throw new BadRequestError('Cannot find any items. Try again later')
	}
	if (req.user) {
		const progressData = await ProgressData.findOne({user: req.user.id})
		const test = await Test.findOne({_id: testId})
		console.log(test)
		const completedTest = await CompletedTest.create({
			name: test.name,
			slug: test.slug,
			complexity: test.complexity,
			result: succeededTests,
			test: test.id
		})
		console.log(completedTest)
		progressData.completedTests.push(completedTest)
		await progressData.save()
	}
	//1. add new Completed Test from testList data and succeededTests

	//2. add map to check techique (гармонический слух = harmonic etc)

	//3. add service for stats checking (if complexity is higher or equal etc.)
	res.status(StatusCodes.OK).json({succeededTests, result})
}

