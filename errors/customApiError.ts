import {UnauthenticatedError} from './unauthenticatedError'
import {NotFoundError} from './notFoundError'
import {BadRequestError} from './badRequestError'

export class CustomAPIError extends Error {
  statusCode: number
  constructor(message: string, status: number) {
    super(message)
    this.statusCode = status
  }
}
