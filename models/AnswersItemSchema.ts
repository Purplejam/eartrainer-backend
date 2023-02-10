const mongoose = require('mongoose')

//answer array schema
const AnswersSchema = new mongoose.Schema({
	answer: {
		type: String,
	}
})


module.exports = {
	AnswersSchema
}