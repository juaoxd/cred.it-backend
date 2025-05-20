import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '../use-cases/register'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = req.body

  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  await registerUseCase.execute({ name, email, password })

  return reply.status(201).send()
}
