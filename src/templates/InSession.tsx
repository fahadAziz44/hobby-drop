import React from 'react'

import Sidebar from 'src/components/Sidebar'
import UpperPannel from 'src/components/UpperPannel'

const InSession = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="w-screen h-screen">
    <Sidebar />
    <div className="right-content">
      <UpperPannel />
      <div className="pt-12">{children}</div>
    </div>
  </div>
)

export default InSession
