import jwt, {JwtPayload} from 'jsonwebtoken'
import {Request, Response} from 'express'
import { ITokenUser } from './createTokenUser.interface';

interface IPayloadJwt {
  payload: {
    user: ITokenUser,
    refreshToken?: string
  } 
}

export const createJWT = ({payload}: IPayloadJwt) => {
  const secret = process.env.JWT_SECRET
  const token = jwt.sign(payload, secret as string)
  return token
}
//read a documentation about return types
export const isTokenValid = ( token: string ) => {
  const secret = process.env.JWT_SECRET
  return jwt.verify(token, secret as string) 
}

export const attachCookiesToResponse = (res: Response, user: ITokenUser, refreshToken: string) => {
  const accessTokenJWT = createJWT({ payload: {user}})
  const refreshTokenJWT = createJWT({ payload: {user, refreshToken}})

  const oneDay = 1000 * 60 * 60 * 24
  const oneMonth = 1000 * 60 * 60 * 24 * 30

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: false,
    signed: true,
    expires: new Date(Date.now() + oneDay)
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: false,
    signed: true,
    expires: new Date(Date.now() + oneMonth)
  })
}

