import { User } from '../../../database/generated/prisma'
import { CreateUserDTO } from '../dtos/create-user-dto'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use-error'
import { UsersRepository } from '../repositories/users-repository'
import { hash } from 'bcrypt'

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

    const hashedPassword = await this.hashPassword(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    if (!user) {
      throw new Error()
    }

    return { user }
  }

  private async hashPassword(password: string) {
    const saltRounds = 10

    const hashedPassword = await hash(password, saltRounds)

    return hashedPassword
  }
}
