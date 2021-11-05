import React from 'react'

import { Box, CircularProgress, Container } from '@chakra-ui/react'
import useSWR from 'swr'

import { fetchGetJSON } from 'src/utils/api-helpers'

interface FileProps {}

const FilesList = (_props: FileProps) => {
  const { data, error } = useSWR('/api/files', fetchGetJSON)
  if (error) return <div>Failed to load</div>
  if (!data) return <CircularProgress isIndeterminate color="green.300" />

  return (
    <Container maxW="xl" centerContent bg="gray.100">
      <ul>
        {data.map((p: any) => (
          <Box boxSize="sm" key={p.id}>
            {p.id}
          </Box>
        ))}
      </ul>
    </Container>
  )
}

export default FilesList
