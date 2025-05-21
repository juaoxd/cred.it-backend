import fastify from 'fastify'
import { userRoutes } from './modules/users/routes'
import { errorHandler } from './error-handler'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { authRoutes } from './modules/auth/routes'

const server = fastify()

server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'auth',
    signed: false,
  },
  sign: {
    expiresIn: '7d',
  },
})

server.register(fastifyCookie)

server.get('/', () => {
  return 'hello world'
})

server.register(userRoutes)

server.register(authRoutes)

server.setErrorHandler(errorHandler)

server.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on port ${env.PORT}`)
})
