import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'
import { GetUserProfileUseCase } from '../use-cases/get-profile'

export async function getProfile(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.user.sub

  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  const { email, name } = await getUserProfileUseCase.execute({ userId })

  return reply.send({
    name,
    email,
  })
}
