import { User } from '../../../database/generated/prisma'
import { CreateUserDTO } from '../dtos/create-user-dto'
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
    const user = await this.usersRepository.create({ name, email, password })

    if (!user) {
      throw new Error()
    }

    return { user }
  }
}
