import mongoose from 'mongoose'

export interface IProgressDataSchema extends mongoose.Document {
	user: string, 
	stats: {
		harmonic: number, 
		tech: number, 
		rhythm: number
	}
}