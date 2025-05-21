import { FastifyInstance } from 'fastify'
import { signIn } from './controllers/sign-in'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/sign-in', signIn)
}
