import React from 'react'

import { Alert, AlertIcon, Box, Container } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import nc from 'next-connect'

import auth from 'src/middleware/auth'

interface UserProps {
  id: string
  firstName: string
  lastName?: string
  email: string
  error?: string
}

const UserPage = ({ id, firstName, lastName, email, error }: UserProps) => {
  return (
    <Container maxW="xl" centerContent bg="gray.100">
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {!error && (
        <>
          <Box padding="4" maxW="3xl">
            ID: {id}
          </Box>
          <Box padding="4" maxW="3xl">
            First Name: {firstName}
          </Box>
          <Box padding="4" maxW="3xl">
            Last Name: {lastName}
          </Box>
          <Box padding="4" maxW="3xl">
            Email: {email}
          </Box>
        </>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: any) => {
  const handler = nc().use(auth)
  try {
    await handler.run(req, res)
    const { user } = req
    if (user) {
      return {
        props: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      }
    }
    throw new Error('user not found')
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message || error.name : error
    // eslint-disable-next-line no-console
    console.error('Error occured: ', errorMessage)

    return {
      props: {
        error: errorMessage,
      },
    }
  }
}

export default UserPage
