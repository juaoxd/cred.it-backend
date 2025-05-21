import { compare } from 'bcrypt'
import { UsersRepository } from '../../users/repositories/users-repository'
import { User } from '../../../database/generated/prisma'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface SignInUseCaseRequest {
  email: string
  password: string
}

interface SignInUseCaseResponse {
  user: User
}

export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordValid = await compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
