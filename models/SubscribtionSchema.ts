import mongoose from 'mongoose'

export const SubscribtionSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	}, 
	isValid: {
		type: Boolean, 
		default: false
	}
}, {timestamps: true})


export const Subscribtion = mongoose.model('Subscribtion', SubscribtionSchema)