import { randomUUID } from 'node:crypto'
import { User } from '../../../database/generated/prisma'
import { CreateUserDTO } from '../dtos/create-user-dto'
import { UsersRepository } from './users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create({ name, email, password }: CreateUserDTO) {
    const user = {
      id: randomUUID(),
      name,
      email,
      passwordHash: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
