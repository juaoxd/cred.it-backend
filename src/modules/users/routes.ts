import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { verifyJWT } from '../../middleware/verify-jwt'
import { getProfile } from './controllers/get-profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.get('/me', { onRequest: [verifyJWT] }, getProfile)
}
