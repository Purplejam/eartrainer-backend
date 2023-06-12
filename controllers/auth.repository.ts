import mongoose from 'mongoose'
import {ITokenUser} from './createTokenUser.interface'
import {Token} from '../models/TokenSchema'
import {User} from '../models/UserSchema'
import {Subscribtion} from '../models/SubscribtionSchema'
import { IUserSchema } from '../models/interfaces/UserSchema.interface';
import { ISubscription } from '../models/interfaces/Subscription.interface';
import { IToken } from '../models/interfaces/TokenSchema.interface';

interface INewUser {
	name: string,
	email: string,
	password: string, 
	role: string, 
	verificationToken: string
}


const findUserRepository = async (email: string): Promise <void | IUserSchema> => {
	const user = await User.findOne({email})
	return user
}

const createUserRepository = async ({name, email, password, role, verificationToken}: INewUser): Promise<void | IUserSchema> => {
	const user = await User.create({name, email, password, role, verificationToken})
	return user
}

const findSubscriptionRepository = async (email: string): Promise<void | ISubscription> => {
	const subscription = await Subscribtion.findOne({email})
	return subscription
}

const createSubscriptionRepository = async ({email, isValid}: ISubscription): Promise<void | ISubscription> => {
	const subscription = await Subscribtion.create({email, isValid})
	return subscription
}

const findTokenRepository = async (user: string): Promise<void | IToken> => {
	const token = await Token.findOne({user})
	return token
}

const createTokenRepository = async ({refreshToken, ip, userAgent, user}: IToken): Promise<void | IToken> => {
	const token = await Token.create({refreshToken, ip, userAgent, user})
	return token
}






