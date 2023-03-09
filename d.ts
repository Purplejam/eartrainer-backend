import { ITokenUser } from './controllers/createTokenUser.interface';



declare global {
  namespace Express {
    export interface Request {
      user?: ITokenUser
    }
  }
}

export {}