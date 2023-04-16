import mongoose from 'mongoose'

export const CompletedTestSchema = new mongoose.Schema({
	name: {
		type: String
	},
	slug: {
		type: String
	},
	complexity: {
		type: String
	},
	result: {
		type: String
	},
	technique: {
		type: String
	},
	quantity: {
		type: String
	}, 
	test: {
		type: mongoose.Types.ObjectId,
		ref: 'Test',
		required: true
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

export const CompletedTest = mongoose.model('CompletedTest', CompletedTestSchema)