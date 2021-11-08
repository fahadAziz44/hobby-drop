import React from 'react'

import { Icon } from '@chakra-ui/react'
import { AiOutlineHome, AiOutlineFileImage } from 'react-icons/ai'

import SidebarButton from './SidebarButton'

const Sidebar: React.FC = () => (
  <div
    className="
      fixed top-12 h-screen left-0 w-16 
    bg-gray-900 text-white
      flex flex-col
      shadow-lg text-2xl
    "
  >
    <SidebarButton href="/">
      <Icon as={AiOutlineHome} w={10} h={10} />
    </SidebarButton>
    <SidebarButton href="/images">
      <Icon as={AiOutlineFileImage} w={10} h={10} />
    </SidebarButton>
  </div>
)

export default Sidebar
