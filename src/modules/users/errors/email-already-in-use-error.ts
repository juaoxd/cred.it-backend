import { ApplicationError } from '../../../application-error'

export class EmailAlreadyInUseError extends ApplicationError {
  constructor() {
    super(409, 'E-mail already in use.')
  }
}
