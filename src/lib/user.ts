import { User } from '@prisma/client'

export const makeUserFromDBUser = (userDB: User) => ({
  id: userDB.id,
  email: userDB.email,
  firstName: userDB.firstName,
  lastName: userDB.lastName,
})
