import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

import { createFile, updateFileUploadById } from 'src/lib/db_file'
import auth from 'src/middleware/auth'
import { getS3UploadPreSignedUrl } from 'src/utils/file-upload'

import { GetUploadUrlResponseBody, PostUploadUrlReqBody } from '../../lib/types'

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
  .get<NextApiRequest, NextApiResponse<GetUploadUrlResponseBody>>(
    async (req: any, res: any) => {
      try {
        const { file, type } = req.query
        const fileName = `${req.user.id}-${Date.now()}-${file}`
        const post = await getS3UploadPreSignedUrl(fileName)
        const userFile = await createFile({
          fileName,
          name: req.query.file,
          userId: req.user.id,
          type,
          url: post.url,
        })

        res.status(200).json({ ...post, id: userFile.id })
      } catch (error: any) {
        res.status(500).end(error.message)
      }
    }
  )
  .post<NextApiRequest, NextApiResponse>(async (req, res) => {
    try {
      const { id } = req.body as PostUploadUrlReqBody
      const userFile = await updateFileUploadById(Number(id))
      res.status(200).json({
        id: userFile.id,
        name: userFile.name,
        url: userFile.url,
      })
    } catch (error: any) {
      res.status(500).end(error.message)
    }
  })
