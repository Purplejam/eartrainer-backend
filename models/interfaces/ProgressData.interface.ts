import mongoose from 'mongoose'

export interface IProgressData {
	user: string, 
	stats: {
		harmonic: number, 
		tech: number, 
		rhythm: number
	}
}