const mongoose = require('mongoose')
const {TestItemSchema} = require('./TestItemSchema')
const {compareTestsService} = require('./TestListSchema.service')

//array of tests schema
const TestListSchema = new mongoose.Schema({
	testId: {
		type: mongoose.Types.ObjectId,
		ref: 'Test',
		required: [true, 'Please provide linked test']
	},
	tests: [TestItemSchema]
})

TestListSchema.methods.compareAnswers = async function(answerList) {
	const testsData = this.tests
	const {result, succeededTests} = await compareTestsService(answerList, testsData)
	return {result, succeededTests}
}

const TestList = mongoose.model('TestList', TestListSchema)
module.exports = {
	TestListSchema, 
	TestList
}