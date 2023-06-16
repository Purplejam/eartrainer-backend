import mongoose from 'mongoose'

export interface IUserSchema extends mongoose.Document {
	name: string,
	email: string,
	password: string,
	role: 'user' | 'admin',
	verificationToken?: string,
	isVerified: boolean,
	verified?: string, 
	passwordToken?: string, 
	passwordTokenExpirationDate?: Date | null
}