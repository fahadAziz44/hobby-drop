import React, { useState } from 'react'

import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react'
import Link from 'next/link'
import router from 'next/router'
import { BiLogOutCircle } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { GiDirewolf, GiAnimalSkull } from 'react-icons/gi'

import { GetUserResponse } from 'src/lib/types'

interface UpperPannelProps {
  user?: GetUserResponse
}

const UpperPannel: React.FC<UpperPannelProps> = ({ user }) => {
  const [logoutLoading, setLogoutLoading] = useState(false)
  const onLogoutClick = async () => {
    setLogoutLoading(true)
    const res = await fetch('/api/logout')

    setLogoutLoading(false)
    if (res.status === 204) {
      router.push('/login')
    }
  }
  return (
    <div
      className="
      fixed top-0 w-screen right-0 h-12
    bg-gray-900
      flex justify-between align-middle items-center
      shadow-lg text-2xl
      px-2 z-10
    "
    >
      <Link href="/user" passHref>
        <div className="pl-4 cursor-pointer text-teal-500 hover:text-white">
          <Icon as={GiDirewolf} h={8} w={8} />
        </div>
      </Link>
      {user && (
        <Menu>
          <MenuButton
            className="
            cursor-pointer
            bg-grey-800 hover:bg-teal-700
          text-teal-500 hover:text-white
          "
            as={Avatar}
            size="sm"
            bg={'teal.500'}
            icon={<Icon as={GiAnimalSkull} w={8} h={8} />}
          />

          <MenuList>
            <MenuItem className="user-menu-item" icon={<FaUserAlt />}>{`${
              user.firstName
            } ${user.lastName || ''}`}</MenuItem>
            <MenuItem
              className="user-menu-item"
              onClick={onLogoutClick}
              icon={logoutLoading ? <Spinner size="sm" /> : <BiLogOutCircle />}
              iconSpacing={2}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  )
}

export default UpperPannel
