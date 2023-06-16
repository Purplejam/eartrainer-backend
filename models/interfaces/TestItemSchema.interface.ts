import mongoose from 'mongoose'

export interface ITestItemSchema extends mongoose.Document {
	id: string,
	correct?: string,	
	question: string, 
	audio: string
}
