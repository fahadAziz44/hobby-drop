import React from 'react'

import { Container } from '@chakra-ui/react'

import FilesList from 'src/components/FilesList'
import InSession from 'src/templates/InSession'

const UserPage = () => {
  return (
    <InSession>
      <Container maxW="xl" centerContent bg="gray.100">
        <FilesList />
      </Container>
    </InSession>
  )
}

export default UserPage
