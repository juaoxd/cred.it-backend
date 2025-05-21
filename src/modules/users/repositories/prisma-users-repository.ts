import { User } from '../../../database/generated/prisma'
import { prisma } from '../../../lib/prisma'
import { CreateUserDTO } from '../dtos/create-user-dto'
import { UsersRepository } from './users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserDTO): Promise<User | null> {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.password,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    })
  }
}
