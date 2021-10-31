import React from 'react'

import { Container, Icon } from '@chakra-ui/react'
import Dropzone from 'react-dropzone'
import { AiOutlineUpload } from 'react-icons/ai'

interface UserProps {}

const DropFilesbox = (_props: UserProps) => {
  return (
    <Container
      className="w-full max-w-2xl h-80 flex justify-center content-center"
      maxW="xl"
      centerContent
      bg="gray.100"
    >
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
