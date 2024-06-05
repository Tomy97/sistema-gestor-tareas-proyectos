import type React from 'react'
import { Outlet } from 'react-router-dom'

import { SidebarMenu } from '../components/SidebarMenu'

const Layout: React.FC = () => {
  return (
    <>
      {/* header */}
      <div className="grid">
        <div className="p-col">
          <SidebarMenu />
        </div>
        <div className="p-col">
          <Outlet />
        </div>
      </div>
      {/* footer */}
    </>
  )
}

export default Layout
