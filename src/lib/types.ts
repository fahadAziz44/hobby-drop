import { PresignedPost } from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export interface NextApiRequestWithBody<T> extends NextApiRequest {
  body: T
}

// Req/Res Types

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
export interface DeleteUserFileRes {
  id: number
  deleted: boolean
}

export interface GetUserResponse {
  id: number
  email: string
  firstName: string
  lastName: string | null
  createdAt: Date
  updatedAt: Date
}

// types for Use at client side

export interface UserFile extends Omit<GetUserFilesResponse, 'id'> {
  id: string
}
export interface User extends Omit<GetUserResponse, 'id'> {
  id: string
}

export interface GetUploadUrlResponseBody extends PresignedPost {
  id: string
}
