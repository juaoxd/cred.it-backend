import { User } from '../../../database/generated/prisma'
import { CreateUserDTO } from '../dtos/create-user-dto'

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
