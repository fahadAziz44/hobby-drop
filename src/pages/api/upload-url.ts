import nextConnect from 'next-connect'

import auth from 'src/middleware/auth'
import { getS3UploadPreSignedUrl } from 'src/utils/file-upload'

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
      const post = await getS3UploadPreSignedUrl(req.query.file)
      res.status(200).json(post)
    } catch (error: any) {
      res.status(500).end(error.message)
    }
  })
  .post(async (req: any, res: any) => {
    try {
      console.log('req.body: ', req.body)
      res.status(200).json({ id: '123123123' })
    } catch (error: any) {
      console.log('error occured: ', error)
      res.status(500).end(error.message)
    }
  })
