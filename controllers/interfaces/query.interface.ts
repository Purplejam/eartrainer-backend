import {stringParseType} from '../../models/interfaces/stringParse.interface'

export interface IQueryObject {
	technique?: stringParseType,
	complexity?: string | object,
	name?: object
}

export interface IVerifyParams {
  email: string,
  verificationToken: string
}