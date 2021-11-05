import prisma from 'src/lib/prisma'

import { GetUserFilesResponse } from './types'

export async function createFile({
  userId,
  name,
  fileName,
  type,
  url,
}: {
  name: string
  fileName: string
  type: string
  url: string
  userId: string
}) {
  try {
    const user = await prisma.file.create({
      data: {
        name,
        fileName,
        type,
        url,
        author: { connect: { id: Number(userId) } },
      },
    })

    return user
  } catch (err: any) {
    throw new Error(err.message || 'something went wrong creating file')
  }
}

export const findImagesByUser = async ({
  userId,
}: {
  userId: string
}): Promise<GetUserFilesResponse[]> => {
  try {
    const Userfiles = await prisma.file.findMany({
      where: {
        author: {
          id: Number(userId),
        },
        uploaded: true,
        type: {
          contains: 'image',
        },
      },
      select: {
        id: true,
        url: true,
        name: true,
        fileName: true,
        type: true,
      },
    })
    return Userfiles
  } catch (err: any) {
    throw new Error(err.message || 'something went wrong finding file by id')
  }
}

export const findFileById = async (id: number) => {
  try {
    const Userfiles = await prisma.file.findUnique({
      where: { id },
    })
    return Userfiles
  } catch (err: any) {
    throw new Error(err.message || 'something went wrong finding file by id')
  }
}

export const updateFileUploadById = async (id: number) => {
  try {
    const Userfiles = await prisma.file.update({
      where: { id },
      data: {
        uploaded: true,
      },
    })
    return Userfiles
  } catch (err: any) {
    throw new Error(
      err.message || 'something went wrong confirming file upload'
    )
  }
}
