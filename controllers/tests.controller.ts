import {Test} from '../models/TestSchema'
import {TestList} from '../models/TestListSchema'
import {TestItem} from '../models/TestItemSchema'
import {StatusCodes} from 'http-status-codes'
import mongoose from 'mongoose'
import {CustomAPIError, BadRequestError, NotFoundError} from '../errors'
import {getAllTestsService} from './tests.service'
import {Request, Response} from 'express'


export const getAllTests = async (req: Request, res: Response) => {
	const {tests, totalTests} = await getAllTestsService(req, res)
	if (!tests) {
		throw new NotFoundError('Cannot find any items. Try again later')
	}
	res.status(StatusCodes.OK).json({tests, totalTests})
}


export const getSingleTest = async (req: Request, res: Response) => {
	const {id: testId} = req.params
	const testList = await TestList.findOne({testId})
	if(!testList) {
		throw new BadRequestError('Please provide correct test id')
	}
	res.status(StatusCodes.OK).json(testList)
}


export const compareAnswers = async (req: Request, res: Response) => {
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
	res.status(StatusCodes.OK).json({succeededTests, result})
}

