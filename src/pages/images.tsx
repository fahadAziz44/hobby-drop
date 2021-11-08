import React from 'react'

import FilesList from 'src/components/FilesList'
import { Provider, rootStore } from 'src/stores/Root'
import InSession from 'src/templates/InSession'

const Images = () => {
  return (
    <Provider value={rootStore}>
      <InSession>
        <FilesList />
      </InSession>
    </Provider>
  )
}

export default Images
