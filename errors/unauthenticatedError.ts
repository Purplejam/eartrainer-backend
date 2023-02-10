import { StatusCodes } from 'http-status-codes'
import {CustomAPIError} from './customApiError'


export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

