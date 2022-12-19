const mongoose = require('mongoose')

//answer array schema
const AnswersSchema = new mongoose.Schema({
	answer: {
		type: String,
	}
})

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
	let result = []
	let succeededTests = 0

	for (let answer in answerList) {
		for (let k = 0; k < testsData.length; k++) {
			let answerObject = {isCorrect: false}
			if (answerList[answer].answerId === testsData[k].id) {
				answerObject.id = testsData[k].id
				answerObject.usersAnswer = answerList[answer].answer
				answerObject.correct = testsData[k].correct
				answerObject.audio = testsData[k].audio
				answerObject.question = testsData[k].question
				if (answerList[answer].answer === testsData[k].correct) {
					answerObject.isCorrect = true
					succeededTests++
				}
				result.push(answerObject)
				break
			}
		}
	}
	return {result, succeededTests}
}


//main test schema
const TestSchema = new mongoose.Schema({
	slug: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	technique: {
		type: String,
	},
	complexity: {
		type: Number,
	},
	description: {
		type: String,
	}
}, { timestamps: true })

const Test = mongoose.model('Test', TestSchema)
const TestList = mongoose.model('TestList', TestListSchema)
const TestItem = mongoose.model('TestItem', TestItemSchema)

module.exports = {Test, TestList, TestItem}