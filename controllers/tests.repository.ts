import mongoose from 'mongoose'
import {CompletedTest} from '../models/CompletedTestSchema'
import {IProgressDataSchema} from '../models/interfaces/ProgressData.interface'
import {ITestListSchema} from '../models/interfaces/TestListSchema.interface'
import {ITestSchema} from '../models/interfaces/TestSchema.interface'
import {ProgressData} from '../models/ProgressDataSchema'
import {TestItem} from '../models/TestItemSchema'
import {TestList} from '../models/TestListSchema'
import {Test} from '../models/TestSchema'

export const getSingleTestRepository = async (testId: string): Promise<ITestSchema | null> => {
	const test = await Test.findOne({_id: testId})
	return test
}

export const getSingleTestListRepository = async (testId: string): Promise<ITestListSchema | null> => {
	const testList = await TestList.findOne({testId})
	return testList
}

export const getProgressDataRepository = async (userId: string): Promise<IProgressDataSchema | null> => {
	const progressData = await ProgressData.findOne({user: userId})
	return progressData
}

export const deleteCompletedTestRepository = async (id: string): Promise<any> => {
	const result = await CompletedTest.deleteMany({user: id})
	return result
}

