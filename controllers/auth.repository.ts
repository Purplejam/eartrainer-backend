import mongoose from 'mongoose'
import {INewSubscription} from './interfaces/newSubscription.interface'
import {INewUser} from './interfaces/newUser.interface'
import {ISubscriptionSchema} from '../models/interfaces/Subscription.interface'
import {ITokenSchema} from '../models/interfaces/TokenSchema.interface'
import {ITokenUser} from './interfaces/createTokenUser.interface'
import {IUserSchema} from '../models/interfaces/UserSchema.interface'
import {ProgressData} from '../models/ProgressDataSchema'
import {Subscribtion} from '../models/SubscribtionSchema'
import {Token} from '../models/TokenSchema'
import {User} from '../models/UserSchema'

export const findUserRepository = async (email: string): Promise <void | IUserSchema> => {
	const user = await User.findOne({email})
	return user
}

export const createUserRepository = async ({name, email, password, role, verificationToken}: INewUser): Promise<IUserSchema> => {
	const user = await User.create({name, email, password, role, verificationToken})
	const progressData = await ProgressData.create({user: user?.id})
	return user
}

export const findSubscriptionRepository = async (email: string): Promise<void | ISubscriptionSchema> => {
	const subscription = await Subscribtion.findOne({email})
	return subscription
}

export const createSubscriptionRepository = async ({email, isValid}: INewSubscription): Promise<void | ISubscriptionSchema> => {
	const subscription = await Subscribtion.create({email, isValid})
	return subscription
}

export const findTokenRepository = async (user: string): Promise<void | ITokenSchema> => {
	const token = await Token.findOne({user})
	return token
}

export const deleteTokenRepository = async (user: string): Promise<void> => {
	const token = await Token.findOneAndDelete({user})
}

export const createTokenRepository = async ({refreshToken, ip, userAgent, user}: ITokenSchema): Promise<void | ITokenUser> => {
	const token = await Token.create({refreshToken, ip, userAgent, user})
	return token
}






