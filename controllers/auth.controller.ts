import {StatusCodes} from 'http-status-codes'
import mongoose from 'mongoose'
import {CustomAPIError, BadRequestError, NotFoundError, UnauthenticatedError} from '../errors'
import {Request, Response} from 'express'
import {User} from '../models/UserSchema'
import { sendResetPasswordEmail, sendVerificationEmail } from './sendEmail.service'
import { attachCookieService, forgotPasswordService, logoutService, registerService, resetPasswordService } from './auth.service';
import { createTokenUser } from './createTokenUser.service'
import { Token } from '../models/TokenSchema'
import crypto from 'crypto'
import { attachCookiesToResponse } from './jwt.service'
import { ITokenUser } from './createTokenUser.interface'
import { hashString } from './createHash'

interface IVerifyParams {
  email: string,
  verificationToken: string
}

export const register = async (req: Request, res: Response) => {
  const {email, name, password} = req.body
  if (!email || !name || !password) {
    throw new BadRequestError('Please provide email, name and password')
  }
  const emailAlreadyExists = await User.findOne({email})
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists')
  }
  const user = await registerService(email, name, password)
  if(!user) {
    return res.status(StatusCodes.BAD_REQUEST)
  }

  const origin = 'http://localhost:3000'
  await sendVerificationEmail(user.email, user.name, origin, user.verificationToken)
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please verify your email', 
    verificationToken: user.verificationToken
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isUserVerified = user.isVerified
  if (!isUserVerified) {
    throw new BadRequestError('Please verify your email')
  }
  const tokenUser = await attachCookieService(req, res, user)
  return res.status(StatusCodes.OK).json({user: tokenUser})
}

export const verifyUserEmail = async (req: Request<{}, {}, {}, IVerifyParams>, res: Response) => {
  const {verificationToken, email} = req.query
  if(!verificationToken || !email) {
    throw new BadRequestError('Please provide valid token and email')
  }
  const user = await User.findOne({email})
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  if (user.isVerified) {
    throw new BadRequestError('This user is already verified!')
  }
  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  user.isVerified = true
  user.verified = Date.now()
  user.verificationToken = ''
  await user.save()
  res.status(StatusCodes.OK).json({msg: 'Success! Email has been verified!'})
}

export const showCurrentUser = async(req: Request, res: Response) => {
  if(req.user) {
    return res.status(StatusCodes.OK).json({user: req.user})
  } else {
    res.status(StatusCodes.OK).json({msg: 'There is no user'})
  }
}

export const logout = async(req: Request, res: Response) => {
  await logoutService(req, res)
  res.status(StatusCodes.OK).json({msg: 'User has logged out!'})
}

export const forgotPassword = async(req: Request, res: Response) => {
  const {email} = req.body
  if (!email) {
    throw new BadRequestError('Please provide a valid email')
  }
  const passwordToken = await forgotPasswordService(email)
  res.status(StatusCodes.OK).json({ msg: 'Please check your email for further actions'})
}

export const resetPassword = async(req: Request, res: Response) => {
  const {passwordToken, password, email} = req.body
  if (!passwordToken || !password || !email) {
    throw new BadRequestError('Please provide all data')
  }
  await resetPasswordService(passwordToken, password, email)
  res.status(StatusCodes.OK).json({ msg: 'Success! Password reset' })
}










