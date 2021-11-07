import React from 'react'

import Link from 'next/link'

interface SidebarButtonProps {
  href: string
}
const SidebarButton = ({
  href,
  children,
}: React.PropsWithChildren<SidebarButtonProps>): JSX.Element => (
  <Link href={href} passHref>
    <div
      className="
        w-12 p-6 my-4 mx-auto
        shadow-lg
        bg-grey-800 hover:bg-teal-700
        text-teal-500 hover:text-white
        rounded-3x1 hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer
        flex justify-center align-middle
        "
    >
      {children}
    </div>
  </Link>
)

export default SidebarButton
