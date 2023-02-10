import mongoose from 'mongoose'
import {ITestItemSchema} from './interfaces/TestItemSchema.interface';
const {AnswersSchema} = require('./AnswersItemSchema')

export const TestItemSchema = new mongoose.Schema<ITestItemSchema>({
	audio: {
		type: String,
	},
	question: {
		type: String,
	},
	correct: {
		type: String
	},
	answers: [AnswersSchema]
})

TestItemSchema.methods.toJSON = function() {
 let obj = this.toObject()
 delete obj.correct
 return obj
}

TestItemSchema.methods.showAnswer = function() {
	return this.correct
}

export const TestItem = mongoose.model('TestItem', TestItemSchema)