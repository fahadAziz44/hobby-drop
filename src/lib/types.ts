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

export interface GetUserFilesResponse {
  id: number
  url: string
  name: string
  fileName: string
  type: string
}

export interface GetUserResponse {
  id: number
  email: string
  firstName: string
  lastName: string | null
  createdAt: Date
  updatedAt: Date
}
