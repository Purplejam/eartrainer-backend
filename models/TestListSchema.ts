import mongoose from 'mongoose'
import {TestItemSchema} from './TestItemSchema'
import {compareTestsService} from './TestListSchema.service'
import {ITestListSchema, ISingleAnswer} from './interfaces/TestListSchema.interface'

export const TestListSchema = new mongoose.Schema<ITestListSchema>({
	testId: {
		type: mongoose.Types.ObjectId,
		ref: 'Test',
		required: [true, 'Please provide linked test']
	},
	tests: [TestItemSchema]
})

TestListSchema.methods.compareAnswers = async function(answerList: ISingleAnswer[]) {
	const testsData = this.tests
	const {result, succeededTests} = await compareTestsService(answerList, testsData)
	return {result, succeededTests}
}

export const TestList = mongoose.model('TestList', TestListSchema)