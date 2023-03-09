import mongoose from 'mongoose'

export const TestSchema = new mongoose.Schema({
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

export const Test = mongoose.model('Test', TestSchema)