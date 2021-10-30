import nextConnect from 'next-connect'

import { makeUserFromDBUser } from 'src/lib/user'
import auth from 'src/middleware/auth'

const handler = nextConnect()

export default handler
  .use(auth)
  .use((req: any, res: any, next) => {
    if (!req.user) {
      res.status(401).send('unauthenticated')
    } else {
      next()
    }
  })
  .get(async (req: any, res: any) => {
    try {
      res.status(200).send({
        done: true,
        user: makeUserFromDBUser(req.user),
      })
    } catch (error: any) {
      res.status(500).end(error.message)
    }
  })
