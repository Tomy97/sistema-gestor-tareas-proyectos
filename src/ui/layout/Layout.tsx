import type React from 'react'
import { Outlet } from 'react-router-dom'

import { SidebarMenu } from '../components/SidebarMenu'
import { MobileMenu } from '../components/MobileMenu'

const Layout: React.FC = () => {
  return (
    <>
      <div className="grid">
        <div className="col-fixed hidden xl:block">
          <SidebarMenu />
        </div>
        <div className="col-12 block p-0 lg:hidden">
          <MobileMenu />
        </div>
        <div className="col-12 xl:col">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
