import { NextApiHandler } from 'next'

import prisma from 'src/lib/prisma'

const signup: NextApiHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body as any
    // await createUser(req.body)
    const user = await prisma.user.create({
      data: { email, password, firstName, lastName },
    })
    res.status(200).send({ done: true, body: user })
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}

export default signup
