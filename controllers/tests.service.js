const mongoose = require('mongoose')
const {Test} = require('../models/TestSchema')
const {TestList} = require('../models/TestListSchema')
const {TestItem} = require('../models/TestItemSchema')
const {testDataMap} = require('../models/testDataMap')


const getAllTestsService = async (req, res) => {
	const {technique, complexity, name} = req.query
	let queryObject = {}
	const page = Number(req.query.page) || 1
 const limit = Number(req.query.limit) || 8
 const skip = (page - 1) * limit
	
 if (complexity && complexity !== '' && complexity !== 'Все') {
 	if(testDataMap.has(complexity)) {
 		queryObject.complexity = testDataMap.get(complexity)
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
 	if(testDataMap.has(req.query.sorting)) {
 		result = result.sort(testDataMap.get(req.query.sorting))
 	} 
	} else {
		result = result.sort('complexity')
	}

	result = result.skip(skip).limit(limit) 
	const tests = await result
	const totalTests  = await Test.countDocuments(queryObject)

	return {tests, totalTests}
}


module.exports = {
	getAllTestsService
}