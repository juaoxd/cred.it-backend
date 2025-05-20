import fastify from 'fastify'
import { userRoutes } from './modules/users/routes'

const server = fastify()

server.get('/', () => {
  return 'hello world'
})

server.register(userRoutes)

server.listen({ port: 3000 }).then(() => {
  console.log('HTTP server running on port 3000')
})
