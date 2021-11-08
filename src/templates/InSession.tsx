import React, { useMemo } from 'react'

import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

import Sidebar from 'src/components/Sidebar'
import UpperPannel from 'src/components/UpperPannel'
import useUser from 'src/hooks/useUser'

// InSession Component is protected for only authenticated users.
// It fetches the user and pass user as prop to children
const InSession = ({ children }: React.PropsWithChildren<{}>) => {
  const { loading, user } = useUser({ redirectTo: '/login' })

  const childrenWithProps = useMemo(
    () =>
      user
        ? React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { user })
            }
            return child
          })
        : children,
    [children, user]
  )
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
            <UpperPannel user={user} />
            <div className="insession-content-area">{childrenWithProps}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default InSession
