import mongoose from 'mongoose'

//answer array schema
export const AnswersSchema = new mongoose.Schema({
	answer: {
		type: String,
	}
})

export const AnswerData = mongoose.model('AnswerData', AnswersSchema)