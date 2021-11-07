import React from 'react'

import Sidebar from 'src/components/Sidebar'

const InSession = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="w-screen h-screen">
    <Sidebar />
    <div className="main-content">{children}</div>
  </div>
)

export default InSession
