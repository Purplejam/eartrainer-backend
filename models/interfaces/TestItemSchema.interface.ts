import mongoose from 'mongoose'

export interface ITestItemSchema extends mongoose.Document {
	correct?: string
}
