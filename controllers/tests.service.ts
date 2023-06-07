import {Test} from '../models/TestSchema'
import {TestList} from '../models/TestListSchema'
import {TestItem} from '../models/TestItemSchema'
import {testDataMapComplexity, testDataMapSorting} from '../models/testDataMap'
import {Request, Response} from 'express'
import {IQueryObject} from './query.interface'
import {ITestServiceReturn} from './testsService.interface'
import { ProgressData } from '../models/ProgressDataSchema'
import { CompletedTest } from '../models/CompletedTestSchema'
import {techiqueMap} from '../models/techMap'
import { stringParseType } from '../models/interfaces/stringParse.interface'
import { ICompletedTest } from '../models/interfaces/CompletedTest.interface'

export const getAllTestsService = async (req: Request, res: Response): Promise<ITestServiceReturn> => {
	const {technique, complexity, name} = req.query
	let queryObject: IQueryObject = {}
	const page = Number(req.query.page) || 1
 const limit = Number(req.query.limit) || 8
 const skip = (page - 1) * limit
	
 if (complexity && complexity !== '' && complexity !== 'All') {
 	if(testDataMapComplexity.has(complexity)) {
 		queryObject.complexity = testDataMapComplexity.get(complexity)
 	} else {
 		queryObject.complexity = {$gt: 0}
 	}
 }

 if (technique && technique !== '' && technique !== 'All') { 
 	queryObject.technique = technique
 }
 if (name && name !== '') {
 	queryObject.name = { $regex: name, $options: 'i' }
 } 
 
 let result = Test.find(queryObject)
	if (req.query.sorting && req.query.sorting !== '') {
 	if(testDataMapSorting.has(req.query.sorting)) {
 		result = result.sort(testDataMapSorting.get(req.query.sorting))
 	} 
	} else {
		result = result.sort('complexity')
	}

	result = result.skip(skip).limit(limit) 
	const tests = await result
	const totalTests = await Test.countDocuments(queryObject)
	return {tests, totalTests}
}

//add some additional logic

//add user page account
export const progressDataService = async(req: Request, res: Response, testId: string, succeededTests: number): Promise<void> => {
	if(req.user) {
		const progressData = await ProgressData.findOne({user: req.user.id})
		const test = await Test.findOne({_id: testId})
		const completedTest = await CompletedTest.create({
			name: test.name,
			slug: test.slug,
			complexity: test.complexity,
			result: succeededTests,
			technique: test.technique,
			test: test.id,
			user: req.user.id
		})
		//success rate condition
		if(techiqueMap.has(test.technique)) {
			const technique = techiqueMap.get(test.technique)
			const stats = progressData.stats[`${technique}`]
			if(stats === 10) {
				return
			}
			//if success rate higher than ... and complexity >= stats
			if(succeededTests >= 14 && test.complexity > stats) {
				if(succeededTests >= 17) {
					progressData.stats[`${technique}`] = test.complexity
				}
				if(succeededTests < 17) {
					progressData.stats[`${technique}`] += 0.5
				}
			} else if(succeededTests >= 17 && stats - test.complexity <= 2) {
				progressData.stats[`${technique}`] += 0.25
			}
		}
		await progressData.save()	
	}
}


export const progressHistoryService = async (req: Request, res: Response, userId: stringParseType): Promise<{tests: ICompletedTest[], numOfPages: number }> => {
	const page = req.query.page || 1
	const perPage = 6
	const skip = (+page - 1) * perPage
	const totalTests = await CompletedTest.countDocuments({user: userId})
	const numOfPages = Math.ceil(totalTests / perPage)

	let tests = CompletedTest.find({user: userId})
	tests = tests.sort('-createdAt').skip(skip).limit(perPage)
	tests = await tests
	return {tests, numOfPages}
}

export const getTotalHistoryService = async (userId: string): Promise<{totalTests: any, answers: number}> => {
	const tests = await CompletedTest.find({user: userId})
	const totalTests = tests.length
	let answers = 0
	tests.forEach((test: ICompletedTest) => answers += +test.result)

	return {totalTests, answers}
}












