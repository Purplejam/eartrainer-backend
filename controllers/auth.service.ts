import {User} from '../models/UserSchema'
import crypto from 'crypto'
import { BadRequestError, UnauthenticatedError } from '../errors';
import { attachCookiesToResponse } from './jwt.service';
import { createTokenUser } from './createTokenUser.service';
import { Token } from '../models/TokenSchema';
import {StatusCodes} from 'http-status-codes'
import {Request, Response} from 'express'
import { hashString } from './createHash'
import { sendResetPasswordEmail } from './sendEmail.service';
import { ProgressData } from '../models/ProgressDataSchema';

export const registerService = async(email: string, name: string, password: string) => {
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const verificationToken = crypto.randomBytes(20).toString('hex')
  const user = await User.create({name, email, password, role, verificationToken})
  const progressData = await ProgressData.create({user: user.id})
  return user
}

export const attachCookieService = async(req: Request, res: Response, user: any) => {
 const tokenUser = createTokenUser({name: user.name, id: user._id, role: user.role})
 let refreshToken = ''
 let existingToken = await Token.findOne({user: user._id})
 //1) if token exists and isValid
 if (existingToken) {
   const {isValid} = existingToken
   if (!isValid) {
     throw new UnauthenticatedError('Invalid Credentials');
   }
   refreshToken = existingToken.refreshToken
   attachCookiesToResponse(res, tokenUser, refreshToken)
  //2) if token doesn't exist
 } else {
  refreshToken = crypto.randomBytes(20).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = {refreshToken, ip, userAgent, user: user._id}
  await Token.create(userToken)
  attachCookiesToResponse(res, tokenUser, refreshToken) 
 }
 return tokenUser
}


export const logoutService = async(req: Request, res: Response) => {
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

export const forgotPasswordService = async(email: string) => {
  const user = await User.findOne({email})
  if(!user) {
    throw new BadRequestError('Please provide avalid email')
  }
  const passwordToken = crypto.randomBytes(20).toString('hex')
  const origin = 'https://eartrainer-backend.onrender.com'
  await sendResetPasswordEmail(email, user.name, passwordToken, origin)
  const expOneDay = 1000 * 60 * 60 * 24 * 1
  const passwordTokenExpirationDate = new Date(Date.now() + expOneDay)
  user.passwordToken = hashString(passwordToken)
  user.passwordTokenExpirationDate = passwordTokenExpirationDate
  await user.save()
  return passwordToken
}

export const resetPasswordService = async(passwordToken: string, password: string, email: string) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new BadRequestError('Please provide avalid email');
  }
  const currentDate = new Date(Date.now())
  if (user.passwordToken === hashString(passwordToken) && 
    currentDate < user.passwordTokenExpirationDate) {
    user.password = password
    user.passwordTokenExpirationDate = null
    user.passwordToken = null
    await user.save()
  }
}
