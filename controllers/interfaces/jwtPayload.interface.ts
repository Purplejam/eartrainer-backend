import {ITokenUser} from './createTokenUser.interface'

export interface IPayloadJwt {
  payload: {
    user: ITokenUser,
    refreshToken?: string
  } 
}