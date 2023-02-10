import {Test} from '../models/TestSchema'
import {TestList} from '../models/TestListSchema'
import {TestItem} from '../models/TestItemSchema'
import {testDataMapComplexity, testDataMapSorting} from '../models/testDataMap'
import {Request, Response} from 'express'
import {IQueryObject} from './query.interface'


export const getAllTestsService = async (req: Request, res: Response) => {
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
