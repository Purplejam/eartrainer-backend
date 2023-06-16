import mongoose from 'mongoose'

export interface ISubscriptionSchema extends mongoose.Document {
	email: string, 
	isValid: boolean
}