import nextConnect from 'next-connect'

import { createUser } from 'src/lib/db'
import { makeUserFromDBUser } from 'src/lib/user'

import auth from '../../middleware/auth'

const handler = nextConnect()

export default handler.use(auth).post(async (req: any, res: any) => {
  try {
    const { email, password, firstName, lastName } = req.body as any
    const user = await createUser({
      email,
      password,
      firstName,
      lastName,
    })

    req.logIn(user, (err: any) => {
      if (err) throw err

      res.status(201).json({
        done: true,
        user: makeUserFromDBUser(user),
      })
    })
  } catch (error: any) {
    res.status(500).end(error.message)
  }
})
