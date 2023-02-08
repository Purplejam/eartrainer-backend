const mongoose = require('mongoose')
const {TestListSchema} = require('./TestListSchema')

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
module.exports = {
	Test,
	TestSchema
}