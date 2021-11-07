import { User } from '@prisma/client'

import { GetUserResponse } from './types'

export const makeUserFromDBUser = (userDB: User): GetUserResponse => ({
  id: userDB.id,
  email: userDB.email,
  firstName: userDB.firstName,
  lastName: userDB.lastName,
  createdAt: userDB.createdAt,
  updatedAt: userDB.updatedAt,
})
