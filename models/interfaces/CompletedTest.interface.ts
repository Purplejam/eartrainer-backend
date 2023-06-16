import mongoose from 'mongoose'

export interface ICompletedTestSchema extends mongoose.Document {
	name: string,
	slug: string,
	complexity: string,
	result: string,
	technique: string,
	quantity: string,
	test: string,
	user: string
}