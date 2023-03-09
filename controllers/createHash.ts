import crypto from 'crypto'

export const hashString = (string: string) => {
	return crypto.createHash('md5').update(string).digest('hex')
}


