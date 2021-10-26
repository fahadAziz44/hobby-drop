import { NextApiHandler } from 'next'

const signup: NextApiHandler = (req, res) => {
  try {
    // await createUser(req.body)
    console.log('signup req: ', req.body)
    res.status(200).send({ done: true, body: req.body })
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}

export default signup
