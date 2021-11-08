import React from 'react'

import { Alert, AlertIcon, Avatar, Box, Icon } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import nc from 'next-connect'
import { GiAnimalSkull } from 'react-icons/gi'

import DropFilesbox from 'src/components/DropFilesBox'
import auth from 'src/middleware/auth'
import InSession from 'src/templates/InSession'

interface UserProps {
  id: string
  firstName: string
  lastName?: string
  email: string
  error?: string
  createdAt: string
}

const UserPage = ({
  firstName,
  lastName,
  email,
  error,
  createdAt,
}: UserProps) => {
  return (
    <InSession>
      <div className="w-full p-9 bg-gray-100">
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {!error && (
          <div className="flex justify-around">
            <div className="flex p-16 gap-x-8 items-center">
              <Avatar
                className="
                  bg-grey-800 
                text-teal-500
                "
                size="2xl"
                bg={'teal.500'}
                icon={<Icon as={GiAnimalSkull} w={20} h={20} />}
              />
              <div>
                <Box padding="4" maxW="3xl">
                  <span className="bold">Name: </span>
                  {`${firstName} ${lastName || ''}`}
                </Box>
                <Box padding="4" maxW="3xl">
                  <span className="bold">Email:</span> {email}
                </Box>
                <Box padding="4" maxW="3xl">
                  <span className="bold">Joined:</span>
                  {new Date(createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Box>
              </div>
            </div>
            <DropFilesbox />
          </div>
        )}
      </div>
    </InSession>
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
          createdAt: String(user.createdAt),
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
