import mongoose from 'mongoose'
import { ISubscription } from './interfaces/Subscription.interface';

export const SubscribtionSchema = new mongoose.Schema<ISubscription>({
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