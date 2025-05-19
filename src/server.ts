import fastify from 'fastify'

const server = fastify()

server.get('/', () => {
  return 'hello world'
})

server.listen({ port: 3000 }).then(() => {
  console.log('HTTP server running on port 3000')
})
