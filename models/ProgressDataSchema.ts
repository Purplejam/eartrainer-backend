import mongoose from 'mongoose'
import {IProgressDataSchema} from './interfaces/ProgressData.interface'

export const ProgressDataSchema = new mongoose.Schema<IProgressDataSchema>({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	stats: {
		harmonic: {
			type: Number,
			default: 1
		},
		tech: {
			type: Number,
			default: 1
		},
		rhythm: {
			type: Number,
			default: 1
		},
	}
})


export const ProgressData = mongoose.model('ProgressData', ProgressDataSchema)



