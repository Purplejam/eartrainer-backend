import {Test} from '../models/TestSchema'
import {TestList} from '../models/TestListSchema'
import {TestItem} from '../models/TestItemSchema'
import {testDataMapComplexity, testDataMapSorting} from '../models/testDataMap'
import {Request, Response} from 'express'
import {IQueryObject} from './query.interface'
import {ITestServiceReturn} from './testsService.interface'
import { CompletedTest, ProgressData } from '../models/ProgressDataSchema'
import {techiqueMap} from '../models/techMap'

export const getAllTestsService = async (req: Request, res: Response): Promise<ITestServiceReturn> => {
	const {technique, complexity, name} = req.query
	let queryObject: IQueryObject = {}
	const page = Number(req.query.page) || 1
 const limit = Number(req.query.limit) || 8
 const skip = (page - 1) * limit
	
 if (complexity && complexity !== '' && complexity !== 'Все') {
 	if(testDataMapComplexity.has(complexity)) {
 		queryObject.complexity = testDataMapComplexity.get(complexity)
 	} else {
 		queryObject.complexity = {$gt: 0}
 	}
 }

 if (technique && technique !== '' && technique !== 'Все') { 
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
	const totalTests  = await Test.countDocuments(queryObject)
	return {tests, totalTests}
}

export const progressDataService = async(req: Request, res: Response, testId: string, succeededTests: number) => {
	if(req.user) {
		const progressData = await ProgressData.findOne({user: req.user.id})
		const test = await Test.findOne({_id: testId})
		const completedTest = await CompletedTest.create({
			name: test.name,
			slug: test.slug,
			complexity: test.complexity,
			result: succeededTests,
			test: test.id
		})
		progressData.completedTests.push(completedTest)
		//success rate condition
		if(techiqueMap.has(test.technique)) {
			const technique = techiqueMap.get(test.technique)
			const stats = progressData.stats[`${technique}`]
			//if success rate higher than ... and complexity >= stats
			if(succeededTests >= 14 && test.complexity >= stats) {
				if(succeededTests >= 17) {
					progressData.stats[`${technique}`] = test.complexity
				}
				if(succeededTests >= 14 && succeededTests < 17) {
					progressData.stats[`${technique}`] += 0.5
				}
			}
		}
		await progressData.save()	
	}
}













