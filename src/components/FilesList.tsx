import React from 'react'

import { CircularProgress } from '@chakra-ui/react'
import useSWR from 'swr'

import { GetUserFilesResponse } from 'src/lib/types'
import { fetchGetJSON } from 'src/utils/api-helpers'

import ImageItem from './ImageItem'

interface FileProps {}

const FilesList = (_props: FileProps) => {
  const { data, error } = useSWR<GetUserFilesResponse[]>(
    '/api/files',
    fetchGetJSON
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <CircularProgress isIndeterminate color="green.300" />

  const childElements = data.map(({ id, url, name }: GetUserFilesResponse) => (
    <ImageItem id={String(id)} src={url} name={name} key={id} />
  ))

  return (
    <div className="w-full h-full flex flex-wrap gap-4">{childElements}</div>
  )
}

export default FilesList
