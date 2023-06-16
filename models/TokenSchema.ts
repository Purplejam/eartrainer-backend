import mongoose from 'mongoose'
import {ITokenSchema} from './interfaces/TokenSchema.interface'

export const TokenSchema = new mongoose.Schema<ITokenSchema>({
	refreshToken: {
		type: String,
		required: true
	},
	ip: {
		type: String,
		required: true
	},
	userAgent: {
		type: String,
		required: true
	},
	isValid: {
		type: Boolean,
		default: true
	},
 user: {
   type: mongoose.Types.ObjectId,
   ref: 'User',
   required: true,
 },
})


export const Token = mongoose.model('Token', TokenSchema)