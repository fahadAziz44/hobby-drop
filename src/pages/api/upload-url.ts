import aws from 'aws-sdk'
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
      aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: 'eu-central-1',
        signatureVersion: 'v4',
      })

      const s3 = new aws.S3()
      const post = await s3.createPresignedPost({
        Bucket: process.env.AWS_BUCKET_NAME,
        Fields: {
          key: req.query.file,
        },
        Expires: 60, // seconds
        Conditions: [
          ['content-length-range', 0, 4194304], // up to 4 MB
        ],
      })
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
      res.status(500).end(error.message)
    }
  })

export const config = {
  api: {
    bodyParser: false,
  },
}
