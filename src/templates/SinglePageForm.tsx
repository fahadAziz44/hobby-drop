import React from 'react'

const SinglePageForm = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="w-screen h-screen flex justify-center items-center">
    <div className="box-border border-2 border-gray-100 rounded-sm shadow-2xl w-4/5 max-w-2xl p-12 h-4/5 max-h-full">
      {children}
    </div>
  </div>
)

export default SinglePageForm
