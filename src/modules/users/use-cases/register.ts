import { User } from '../../../database/generated/prisma'
import { CreateUserDTO } from '../dtos/create-user-dto'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use-error'
import { UsersRepository } from '../repositories/users-repository'

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyInUseError()
    }

    const user = await this.usersRepository.create({ name, email, password })

    if (!user) {
      throw new Error()
    }

    return { user }
  }
}
