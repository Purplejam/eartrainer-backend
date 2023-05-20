import {Request, Response, NextFunction} from 'express'
import { attachCookiesToResponse, isTokenValid } from '../controllers/jwt.service';
import {JwtPayload} from 'jsonwebtoken'
import { ITokenUser } from '../controllers/createTokenUser.interface';
import { UnauthenticatedError } from '../errors';
import { Token } from '../models/TokenSchema';

export interface IUserDataReq extends Request{
  user: ITokenUser
}

export const authenticateUser = async(req: Request, res: Response, next: NextFunction) => {
	const {refreshToken, accessToken} = req.signedCookies
  if (!refreshToken && !accessToken) {
    return next()
  }
	try {
    if (accessToken) {
      const payload = isTokenValid(accessToken)
      if (typeof payload === 'string') {
      	throw new UnauthenticatedError('Authentication Invalid')
      }
     req.user = payload.user
     return next()	
    }
    if (!refreshToken) {
    	throw new UnauthenticatedError('Authentication Invalid')
    }
    const payload = isTokenValid(refreshToken)
    if (typeof payload === 'string') {
    	throw new UnauthenticatedError('Authentication Invalid')
    }
    const existingToken = await Token.findOne({
      user: payload.user.id,
      refreshToken: payload.refreshToken
    })
    if (!existingToken) {
      return next()  
    }
    if (!existingToken?.isValid) {
      throw new UnauthenticatedError('Authentication Invalid')
    }
    attachCookiesToResponse(
      res,
      payload.user,
      existingToken.refreshToken
    )
    req.user = payload.user
    next()
	} catch(error) {
		throw new UnauthenticatedError('Authentication Invalid')
	}
}