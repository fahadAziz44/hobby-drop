import crypto from 'crypto'

import prisma from 'src/lib/prisma'

import { User } from '.prisma/client'

export async function createUser({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string
  password: string
  firstName: string
  lastName?: string
}) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const user = await prisma.user.create({
    data: { email, firstName, lastName, hash, salt },
  })

  return user
}

export const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })
  return user
}
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  })
}

export const validatePassword = async (user: User, inputPassword: string) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
