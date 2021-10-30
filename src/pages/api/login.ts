import nextConnect from 'next-connect'

import { makeUserFromDBUser } from 'src/lib/user'

import passport from '../../lib/passport'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler.use(auth).post(passport.authenticate('local'), (req: any, res: any) => {
  res.status(201).json({ user: makeUserFromDBUser(req.user) })
})

export default handler
