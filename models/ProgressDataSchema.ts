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
	quantity: {
		type: String
	}, 
	test: {
		type: mongoose.Types.ObjectId,
		ref: 'Test',
		required: true
	}
})

export const ProgressDataSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	completedTests: [CompletedTestSchema],
	stats: {
		harmonic: {
			type: Number,
			default: 0
		},
		tech: {
			type: Number,
			default: 0
		},
		rhythm: {
			type: Number,
			default: 0
		},
	}
})


export const ProgressData = mongoose.model('ProgressData', ProgressDataSchema)
export const CompletedTest = mongoose.model('CompletedTest', CompletedTestSchema)


