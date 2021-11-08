import React from 'react'

import { useToast } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { AiOutlineUpload } from 'react-icons/ai'

import {
  GetUploadUrlResponseBody,
  PostUploadUrlReqBody,
  PostUploadUrlResponse,
} from 'src/lib/types'
import { fetchGetJSON, fetchPostJSON } from 'src/utils/api-helpers'

const Dropzone = dynamic(() => import('react-dropzone'))
interface UserProps {}

const DropFilesbox = (_props: UserProps) => {
  const toast = useToast()
  const uploadFiles = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) {
      return
    }
    try {
      const file: File = acceptedFiles[0] as File
      const filename = encodeURIComponent(file.name)

      // Get a presigend url from API to upload file
      // Make a File entity in db with upload confirmation not confirmed yet
      const { url, fields, id } = await fetchGetJSON<GetUploadUrlResponseBody>(
        `/api/upload-url?file=${filename}&type=${file.type}`
      )
      const formData = new FormData()
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      // upload the file directly to s3
      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (upload.ok) {
        try {
          // after successful upload to s3.
          // confirm that upload has been done
          const fileData: PostUploadUrlReqBody = {
            name: filename,
            url: upload.url,
            type: file.type,
            id,
          }
          await fetchPostJSON<PostUploadUrlReqBody, PostUploadUrlResponse>(
            `/api/upload-url`,
            fileData
          )
          toast({
            title: 'Uploaded successfully',
            description: `upload successfull`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } catch (er: any) {
          throw new Error(er.message || 'error after uploading: ')
        }
      } else {
        throw new Error('error while uploading to S3 bucket')
      }
    } catch (er: any) {
      toast({
        title: 'Error Uploading File',
        description: `${er.message || 'Error occured while'}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  return (
    <div
      className="
        w-full max-w-2xl h-80
        flex justify-center content-center
        bg-gray-400 hover:bg-gray-900
        hover:text-teal-500 text-gray-900
        transition-all duration-200 ease-linear
        "
    >
      <Dropzone
        onDrop={(acceptedFiles) => uploadFiles(acceptedFiles)}
        accept={['.png', '.jpg', '.jpeg']}
        maxFiles={1}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="cursor-pointer w-full h-full flex flex-col justify-center items-center">
            <div
              {...getRootProps()}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <input {...getInputProps()} />
              <AiOutlineUpload size={100} />
              <p className="py-4">
                Drag n drop file here, or click to select file
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}
export default DropFilesbox
