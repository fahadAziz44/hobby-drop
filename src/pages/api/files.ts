import { File } from '@prisma/client'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { NextApiRequest } from 'next/dist/shared/lib/utils'

import { findImagesByUser, updateFileDeleteById } from 'src/lib/db_file'
import auth from 'src/middleware/auth'
import { getS3FileUrl } from 'src/utils/file-upload'

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
  .get<NextApiRequest, NextApiResponse<typeof findImagesByUser>>(
    async (req: any, res: any) => {
      try {
        const userFiles = await findImagesByUser({ userId: req.user.id })
        const mapped = userFiles.map((userFile) => {
          const signedS3Url = getS3FileUrl(userFile.fileName)
          return {
            ...userFile,
            url: signedS3Url,
          }
        })
        res.status(200).json(mapped)
      } catch (error: any) {
        res.status(500).end(error.message)
      }
    }
  )
  .delete<NextApiRequest, NextApiResponse<File>>(async (req, res) => {
    try {
      const { fileId } = req.query
      if (!fileId) {
        throw new Error('file id not present in request')
      }
      const userFiles = await updateFileDeleteById(Number(fileId))
      res.status(200).json(userFiles)
    } catch (error: any) {
      res.status(500).end(error.message)
    }
  })
