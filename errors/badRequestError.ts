import { StatusCodes } from 'http-status-codes'
import {CustomAPIError} from './customApiError'

export class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
