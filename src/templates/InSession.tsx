import React from 'react'

import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

import Sidebar from 'src/components/Sidebar'
import UpperPannel from 'src/components/UpperPannel'
import useUser from 'src/hooks/useUser'

const InSession = ({ children }: React.PropsWithChildren<{}>) => {
  const { loading, user } = useUser({ redirectTo: '/login' })
  console.log('user at inSession template: ', user)
  return (
    <>
      {loading ? (
        <div className="w-screen h-screen">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </div>
      ) : (
        <div className="w-screen h-screen">
          <Sidebar />
          <div className="right-content">
            <UpperPannel />
            <div className="pt-12">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default InSession
