export interface IUserSchema {
	name: string,
	email: string,
	password: string,
	role?: 'user' | 'admin',
	verificationToken?: string,
	isVerified: boolean,
	verified?: string, 
	passwordToken?: string, 
	passwordTokenExpirationDate?: string
}