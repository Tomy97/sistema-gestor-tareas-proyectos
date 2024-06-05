import { Logo } from '../components/Logo'
import { Ripple } from 'primereact/ripple'
import { Avatar } from 'primereact/avatar'
import type { Menu } from '../types/menu'
import { Link } from 'react-router-dom'

export const SidebarMenu = () => {
  const menu: Menu[] = [
    {
      icon: 'home',
      label: 'Dashboard',
      to: '/',
    },
    {
      icon: 'users',
      label: 'Team',
      to: '/team',
    },
    {
      icon: 'cog',
      label: 'Settings',
      to: '/settings',
    },
  ]

  const isLogged = false

  const userLogged = () => {
    if (isLogged) {
      return (
        <div className="mt-auto">
          <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
          <a
            v-ripple
            className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
          >
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
              shape="circle"
            />
            <span className="font-bold">Amy Elsner</span>
          </a>
        </div>
      )
    }
  }

  return (
    <div className="card">
      <div className="min-h-screen flex relative lg:static surface-ground">
        <div
          id="app-sidebar-2"
          className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
          style={{ width: '280px' }}
        >
          <div className="flex flex-column h-full">
            <div className="flex align-items-center justify-content-between p-5 flex-shrink-0">
              <span className="inline-flex align-items-center gap-2">
                <Logo />
                <span className="font-bold text-xl text-gray-900">
                  Project M.
                </span>
              </span>
              <span>
                <i className="pi pi-angle-double-left cursor-pointer text-700" />
              </span>
            </div>
            <div className="overflow-y-auto border-top-1 border-none surface-border">
              <ul className="list-none p-3 m-0">
                {menu.map((elem) => {
                  return (
                    <li key={elem.label}>
                      <Link
                        to={elem.to}
                        className="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full p-ripple no-underline"
                      >
                        <i className={`pi pi-${elem.icon} mr-2`} />
                        <span className="font-medium">{elem.label}</span>
                        <Ripple />
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
              <div className="p-3 m-0 flex align-items-center justify-content-between">
                <span className="text-xs font-bold uppercase">My Proyects</span>
              </div>
            </div>
            {userLogged()}
          </div>
        </div>
      </div>
    </div>
  )
}
