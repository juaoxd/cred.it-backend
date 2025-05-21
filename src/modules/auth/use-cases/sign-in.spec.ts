import { beforeEach, describe, expect, it } from 'vitest'
import { SignInUseCase } from './sign-in'
import { InMemoryUsersRepository } from '../../users/repositories/in-memory-users-repository'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: SignInUseCase

describe('Sign in use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new SignInUseCase(inMemoryUsersRepository)
  })

  it('should be able to sign-in', async () => {
    inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 10),
    })

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user).toEqual(
      expect.objectContaining({
        id: inMemoryUsersRepository.items[0].id,
      }),
    )
  })

  it('should not be able to sign-in with an nonexistent e-mail', async () => {
    await expect(() =>
      sut.execute({ email: 'nonexisting@email.com', password: '123456' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to sign-in with wrong password', async () => {
    inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 10),
    })

    await expect(() =>
      sut.execute({ email: 'johndoe@email.com', password: 'wrongpass' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
