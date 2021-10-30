import nextConnect from 'next-connect'

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
        user: {
          id: req.user.id,
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
        },
      })
    } catch (error: any) {
      res.status(500).end(error.message)
    }
  })
