import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import passport from 'src/lib/passport'
import session from 'src/lib/session'

const auth = nextConnect<NextApiRequest, NextApiResponse>()
  .use(
    session({
      name: 'sess',
      secret: process.env.TOKEN_SECRET as string,
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())

export default auth
