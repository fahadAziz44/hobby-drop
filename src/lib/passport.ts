import passport from 'passport'
import LocalStrategy from 'passport-local'

import { findUserById, validatePassword, findUserByEmail } from './db'

interface PassPortUser extends Express.User {
  id: number
}
passport.serializeUser((user, done) => {
  done(null, (user as PassPortUser).id)
})

passport.deserializeUser(
  async (
    _req: any,
    id: string,
    done: (err: any, user?: false | Express.User | null | undefined) => void
  ) => {
    // deserialize the username back into user object
    const user = await findUserById(Number(id))
    done(null, user)
  }
)

passport.use(
  new LocalStrategy.Strategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    },
    async (_req, email, password, done) => {
      const user = await findUserByEmail(email)
      if (!user || !validatePassword(user, password)) {
        done(null, null)
      } else {
        done(null, user)
      }
    }
  )
)

export default passport
