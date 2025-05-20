import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '../use-cases/register'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'
import { z } from 'zod/v4'

const registerUserBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerUserBodySchema.parse(req.body)

  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  await registerUseCase.execute({ name, email, password })

  return reply.status(201).send()
}
