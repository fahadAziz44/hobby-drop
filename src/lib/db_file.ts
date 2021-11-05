import prisma from 'src/lib/prisma'

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

export const findFileByUser = async ({ userId }: { userId: string }) => {
  try {
    const Userfiles = await prisma.file.findMany({
      where: {
        author: {
          id: Number(userId),
        },
        uploaded: true,
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
