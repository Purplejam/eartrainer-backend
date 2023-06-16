export interface ITokenSchema  {
	refreshToken: string, 
	ip: string,
	userAgent: string,
	isValid: boolean,
	user: string
}