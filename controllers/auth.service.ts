import crypto from 'crypto'
import {attachCookiesToResponse} from './jwt.service'
import {BadRequestError, UnauthenticatedError} from '../errors'
import {createTokenUser} from './createTokenUser.service'
import {hashString} from './createHash'
import {ITokenUser} from './interfaces/createTokenUser.interface'
import {IUserSchema} from '../models/interfaces/UserSchema.interface'
import {ProgressData} from '../models/ProgressDataSchema'
import {Request, Response} from 'express'
import {sendResetPasswordEmail} from './sendEmail.service'
import {StatusCodes} from 'http-status-codes'
import {Token} from '../models/TokenSchema'
import {User} from '../models/UserSchema'
import {createTokenRepository, findTokenRepository, createUserRepository, findUserRepository} from './auth.repository';


export const registerService = async(email: string, name: string, password: string): Promise<IUserSchema> => {
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const verificationToken = crypto.randomBytes(20).toString('hex')
  const user = await createUserRepository({name, email, password, role, verificationToken})
  return user
}


export const attachCookieService = async(req: Request, res: Response, user: IUserSchema): Promise<void | ITokenUser> => {
 const tokenUser = createTokenUser({name: user.name, id: user._id, role: user.role})
 let refreshToken = ''
 let existingToken = await findTokenRepository(user._id)
 //1) if token exists and isValid
 if (existingToken) {
   const {isValid} = existingToken
   if (!isValid) {
     throw new UnauthenticatedError('Invalid Credentials')
   }
   refreshToken = existingToken.refreshToken
   attachCookiesToResponse(res, tokenUser, refreshToken)
  //2) if token doesn't exist
 } else {
  refreshToken = crypto.randomBytes(20).toString('hex')
  const userAgent = req.headers['user-agent'] as string
  const ip = req.ip
  const userToken = {
    refreshToken, 
    isValid: true,
    ip, 
    userAgent, 
    user: user._id}
  await createTokenRepository(userToken)
  attachCookiesToResponse(res, tokenUser, refreshToken) 
 }
 return tokenUser
}


export const logoutService = async(req: Request, res: Response): Promise<void> => {
  await Token.findOneAndDelete({
    user: req.user?.id
  })
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
}


export const forgotPasswordService = async(email: string): Promise<void | string> => {
  const user = await findUserRepository(email)
  if(!user) {
    throw new BadRequestError('Please provide avalid email')
  }
  const passwordToken = crypto.randomBytes(20).toString('hex')
  const origin = 'https://earmentor.onrender.com'
  await sendResetPasswordEmail(email, user.name, passwordToken, origin)
  const expOneDay = 1000 * 60 * 60 * 24 * 1
  const passwordTokenExpirationDate = new Date(Date.now() + expOneDay)
  user.passwordToken = hashString(passwordToken)
  user.passwordTokenExpirationDate = passwordTokenExpirationDate
  await user.save()
  return passwordToken
}


export const resetPasswordService = async(passwordToken: string, password: string, email: string): Promise<void> => {
  const user = await findUserRepository(email)
  if (!user) {
    throw new BadRequestError('Please provide avalid email');
  }
  const currentDate = new Date(Date.now())
  if (user.passwordToken === hashString(passwordToken) && 
    currentDate < user?.passwordTokenExpirationDate!) {
    user.password = password
    user.passwordTokenExpirationDate = null
    user.passwordToken = ''
    await user.save()
  }
}
