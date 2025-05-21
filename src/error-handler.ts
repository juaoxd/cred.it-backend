import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod/v4'
import { ApplicationError } from './application-error'

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

  if (error instanceof ApplicationError) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
    })
  }

  return reply.status(500).send({
    statusCode: 500,
    message: 'Unexpected error',
  })
}
