import aws from 'aws-sdk'

export const getS3UploadPreSignedUrl = async (fileName: string) => {
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
      key: fileName,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 4194304], // up to 4 MB
    ],
  })
  return post
}
