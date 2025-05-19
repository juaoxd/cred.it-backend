import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use-error'

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

  it('should not be able to register a user with same email', async () => {
    inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe 2',
        email: 'johndoe@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError)
  })
})
