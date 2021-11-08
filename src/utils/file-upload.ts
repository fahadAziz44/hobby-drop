import aws from 'aws-sdk'

aws.config.update({
  accessKeyId: process.env.AZ_ACCESS_KEY,
  secretAccessKey: process.env.AZ_SECRET_KEY,
  region: process.env.AZ_REGION,
  signatureVersion: 'v4',
})

export const getS3UploadPreSignedUrl = async (fileName: string) => {
  const s3 = new aws.S3()
  const post = await s3.createPresignedPost({
    Bucket: process.env.AZ_BUCKET_NAME,
    Fields: {
      key: fileName,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 4194304], // up to 4 MB
    ],
  })
  return post
}

export const getS3FileUrl = (fileName: string) => {
  const s3 = new aws.S3()
  const params = { Bucket: process.env.AZ_BUCKET_NAME, Key: fileName }
  const url = s3.getSignedUrl('getObject', params)
  return url
}
