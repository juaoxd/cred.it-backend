import { ApplicationError } from '../../../application-error'

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super(400, 'Invalid credentials.')
  }
}
