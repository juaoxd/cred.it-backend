import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod/v4'
import { EmailAlreadyInUseError } from './modules/users/errors/email-already-in-use-error'

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      message: 'Validation error',
      issues: z.treeifyError(error),
    })
  }

  if (error instanceof EmailAlreadyInUseError) {
    return reply.status(409).send({
      statusCode: 409,
      message: 'E-mail already in use.',
    })
  }

  return reply.status(500).send({
    statusCode: 500,
    message: 'Unexpected error',
  })
}
