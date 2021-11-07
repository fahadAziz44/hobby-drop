import React from 'react'

import { Button, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import { BiLogOutCircle } from 'react-icons/bi'
import { GiDirewolf } from 'react-icons/gi'

const UpperPannel: React.FC = () => (
  <div
    className="
      fixed top-0 w-screen right-0 h-12
    bg-gray-900 text-white
      flex justify-between align-middle
      shadow-lg text-2xl
      px-2
    "
  >
    <Link href="/user" passHref>
      <div className="pl-4 cursor-pointer text-teal-500 hover:text-white">
        <Icon as={GiDirewolf} h={10} w={10} />
      </div>
    </Link>
    <Button
      rightIcon={<Icon as={BiLogOutCircle} />}
      colorScheme="teal"
      variant="outline"
    >
      Logout
    </Button>
  </div>
)

export default UpperPannel
