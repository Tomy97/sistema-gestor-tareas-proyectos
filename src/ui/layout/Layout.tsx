import type React from 'react'
import { Outlet } from 'react-router-dom'

import { SidebarMenu } from '../components/SidebarMenu'
import { MobileMenu } from '../components/MobileMenu'

const Layout: React.FC = () => {
  return (
    <>
      {/* !TODO: hacer header para mobile */}
      <div className="grid">
        <div className="col-fixed hidden lg:block">
          <SidebarMenu />
        </div>
        <div className="col-12 block p-0 lg:hidden">
          <MobileMenu />
        </div>
        <div className="col-12 lg:col">
          <Outlet />
        </div>
      </div>
      {/* footer */}
    </>
  )
}

export default Layout
