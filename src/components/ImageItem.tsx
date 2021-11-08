import React, { useCallback } from 'react'

import { Spinner, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'

interface ImageItemProps {
  id: string
  name: string
  url: string
  onRemove: () => void
  loading: boolean
}

const ImageItem: React.FC<ImageItemProps> = ({
  id: _id,
  name,
  url,
  onRemove,
  loading,
}) => {
  const onDeleteClick = useCallback(() => {
    onRemove()
  }, [onRemove])

  return (
    <div
      className="
      max-w-xl
        max-h-56
        group relative"
    >
      <img
        className="
        max-w-xl
        max-h-56
        hover:shadow-lg
        transition-all duration-100 ease-linear
        rounded-md
        flex justify-center align-middle"
        src={url}
        alt={name}
      />
      <Menu closeOnSelect={false}>
        <MenuButton
          className="
        bg-gray-200 hover:bg-gray-500 shadow-xl
        rounded-full absolute top-1 right-1 cursor-pointer
        transition-all duration-100 origin-center
        p-2 scale-0 group-hover:scale-100"
          as={'div'}
        >
          <BsThreeDots size={15} />
        </MenuButton>

        <MenuList>
          <MenuItem
            className="user-menu-item z-50"
            onClick={onDeleteClick}
            icon={loading ? <Spinner size="sm" /> : <AiOutlineDelete />}
            iconSpacing={2}
          >
            Delete Item
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default ImageItem
