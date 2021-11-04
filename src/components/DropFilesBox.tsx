import React from 'react'

import { Container, Icon, useToast } from '@chakra-ui/react'
import Dropzone from 'react-dropzone'
import { AiOutlineUpload } from 'react-icons/ai'

import { fetchGetJSON, fetchPostJSON } from 'src/utils/api-helpers'

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
      const { url, fields } = await fetchGetJSON(
        `/api/upload-url?file=${filename}`
      )
      const formData = new FormData()
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (upload.ok) {
        try {
          const fileData = {
            name: filename,
            url: upload.url,
            type: file.type,
          }
          const addFileResp = await fetchPostJSON(
            `/api/upload-url?file=${filename}`,
            fileData
          )
          console.log('response from our api: ', addFileResp)
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
    <Container
      className="w-full max-w-2xl h-80 flex justify-center content-center"
      maxW="xl"
      centerContent
      bg="gray.100"
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
              <Icon as={AiOutlineUpload} w={16} h={16} />
              <p className="py-4">
                Drag n drop some files here, or click to select files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </Container>
  )
}
export default DropFilesbox
