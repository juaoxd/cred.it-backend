import fastify from 'fastify'
import { userRoutes } from './modules/users/routes'
import { errorHandler } from './error-handler'

const server = fastify()

server.get('/', () => {
  return 'hello world'
})

server.register(userRoutes)

server.setErrorHandler(errorHandler)

server.listen({ port: 3000 }).then(() => {
  console.log('HTTP server running on port 3000')
})
