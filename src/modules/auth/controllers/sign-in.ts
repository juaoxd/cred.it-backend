import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'
import { PrismaUsersRepository } from '../../users/repositories/prisma-users-repository'
import { SignInUseCase } from '../use-cases/sign-in'

const signInBodySchema = z.object({
  email: z.email(),
  password: z.string(),
})

export async function signIn(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = signInBodySchema.parse(req.body)

  const usersRepository = new PrismaUsersRepository()
  const signInUseCase = new SignInUseCase(usersRepository)

  const { user } = await signInUseCase.execute({ email, password })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
      },
    },
  )

  return reply
    .setCookie('auth', token, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send()
}
