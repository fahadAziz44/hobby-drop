import { PresignedPost } from 'aws-sdk/clients/s3'
import { NextApiResponse } from 'next'

export interface GetUploadUrlResponseBody extends PresignedPost {
  id: string
}

export interface PostUploadUrlReqBody {
  id: string
  name: string
  url: string
  type: string
}

export interface PostUploadUrlResponse extends NextApiResponse {
  id: string
  name: string
  url: string
}
