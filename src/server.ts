import fastify from 'fastify'
import { userRoutes } from './modules/users/routes'
import { errorHandler } from './error-handler'
import { env } from './env'

const server = fastify()

server.get('/', () => {
  return 'hello world'
})

server.register(userRoutes)

server.setErrorHandler(errorHandler)

server.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on port ${env.PORT}`)
})
