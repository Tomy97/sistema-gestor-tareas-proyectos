import type React from 'react'
import { Outlet } from 'react-router-dom'

import { SidebarMenu } from '../components/SidebarMenu'

const Layout: React.FC = () => {
  return (
    <>
      {/* !TODO: hacer header para mobile */}
      <div className="grid">
        <div className="col-fixed hidden lg:block">
          <SidebarMenu />
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
      {/* footer */}
    </>
  )
}

export default Layout
