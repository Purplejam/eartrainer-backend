import mongoose from 'mongoose'

export interface ITestSchema extends mongoose.Document {
	slug: string,
	quantity: number, 
	name: string, 
	technique: string, 
	complexity: number,
	description: string
}