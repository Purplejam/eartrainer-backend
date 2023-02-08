const mongoose = require('mongoose')
const {AnswersSchema} = require('./AnswersItemSchema')

//single test schema
const TestItemSchema = new mongoose.Schema({
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

//delete answers from json
TestItemSchema.methods.toJSON = function() {
 let obj = this.toObject()
 delete obj.correct
 return obj
}

TestItemSchema.methods.showAnswer = function() {
	return this.correct
}

const TestItem = mongoose.model('TestItem', TestItemSchema)
module.exports = {
	TestItemSchema, 
	TestItem
}