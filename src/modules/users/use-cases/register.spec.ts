import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository'
import { RegisterUseCase } from './register'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })
})
