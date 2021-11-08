import React, { useEffect } from 'react'

import { CircularProgress } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { useMst } from 'src/stores/Root'

import ImageItem from './ImageItem'

const FilesList = observer(() => {
  const { gallery } = useMst()

  useEffect(() => {
    gallery.fetchGalleryItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = gallery.items

  if (gallery.state === 'error') return <div>Failed to load</div>
  if (gallery.state === 'pending')
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CircularProgress isIndeterminate color="green.300" />
      </div>
    )

  const childElements = data.map((item) => (
    <ImageItem
      key={item.id}
      id={item.id}
      name={item.name}
      url={item.url}
      onRemove={() => item.remove()}
      loading={item.loading}
    />
  ))

  return (
    <div className="w-full h-full flex flex-wrap gap-4">{childElements}</div>
  )
})

export default FilesList
