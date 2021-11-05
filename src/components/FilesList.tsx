import React from 'react'

import { Box, CircularProgress, Container, Image } from '@chakra-ui/react'
import useSWR from 'swr'

import { GetUserFilesResponse } from 'src/lib/types'
import { fetchGetJSON } from 'src/utils/api-helpers'

interface FileProps {}

const FilesList = (_props: FileProps) => {
  const { data, error } = useSWR<GetUserFilesResponse[]>(
    '/api/files',
    fetchGetJSON
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <CircularProgress isIndeterminate color="green.300" />

  return (
    <Container maxW="xl" centerContent bg="gray.100">
      <ul>
        {(data as any[]).map((p: GetUserFilesResponse) => (
          <Box boxSize="sm" key={p.id}>
            <Image src={p.url} alt={p.name} />
          </Box>
        ))}
      </ul>
    </Container>
  )
}

export default FilesList
