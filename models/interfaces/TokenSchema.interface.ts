export interface IToken  {
	refreshToken: string, 
	ip: string,
	userAgent: string,
	isValid: boolean,
	user: string
}