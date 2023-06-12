import mongoose from 'mongoose'
import {ITestSchema} from './interfaces/TestSchema.interface';

export const TestSchema = new mongoose.Schema<ITestSchema>({
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