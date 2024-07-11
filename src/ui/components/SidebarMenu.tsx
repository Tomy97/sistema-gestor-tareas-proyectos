import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import '../../asset/base.css'

import { Avatar } from 'primereact/avatar'

import type { Menu } from '../types/menu'

import { BulletColor } from './BulletColor'
import { Logo } from '../components/Logo'
import { useWindowSize } from 'react-use'

export const SidebarMenu = () => {
  const [reduceSidebar, setReduceSidebar] = useState<boolean>(false)
  const menu: Menu[] = [
    {
      icon: 'home',
      label: 'Dashboard',
      to: '/'
    }
  ]
  const { width } = useWindowSize()

  const isLogged = false

  const userLogged = () => {
    if (isLogged) {
      return (
        <div className="mt-auto">
          <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
          <Link
            to="#"
            className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
          >
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
              shape="circle"
            />
            <span className="font-bold">Amy Elsner</span>
          </Link>
        </div>
      )
    }
  }

  const toggleSidebarWidth = () => {
    setReduceSidebar(!reduceSidebar)
  }

  const projects = localStorage.getItem('projects')
  const projectList = JSON.parse(projects || '[]')

  useEffect(() => {
    if (width < 1464) {
      setReduceSidebar(true)
    }
    if (width > 1464) {
      setReduceSidebar(false)
    }
  }, [width])

  return (
    <div className="card">
      <div className="min-h-screen flex relative lg:static surface-ground">
        <div
          id="app-sidebar-2"
          className={classNames(
            'surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none',
            { 'sidebar-open': !reduceSidebar, 'sidebar-closed': reduceSidebar }
          )}
        >
          <div className="flex flex-column h-full">
            <div
              className={`flex align-items-center justify-content-between ${reduceSidebar ? 'p-2' : 'p-5'} flex-shrink-0`}
            >
              <span className="inline-flex align-items-center gap-2">
                <Logo />
                {reduceSidebar ? null : (
                  <span className="font-bold text-xl text-gray-900">
                    Project M.
                  </span>
                )}
              </span>
              <span>
                <i
                  className={`pi pi-angle-double-${reduceSidebar ? 'right' : 'left'} cursor-pointer text-700`}
                  onClick={toggleSidebarWidth}
                />
              </span>
            </div>
            <div className="overflow-y-auto border-top-1 border-none surface-border">
              <ul className="list-none p-3 m-0">
                {menu.map((elem) => {
                  return (
                    <li key={elem.label}>
                      <Link
                        to={elem.to}
                        className="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 hover:text-primario transition-duration-150 transition-colors w-full p-ripple no-underline text-secundario"
                      >
                        <i className={`pi pi-${elem.icon} mr-2`} />
                        {reduceSidebar ? null : (
                          <span className="font-medium">{elem.label}</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              {reduceSidebar ? (
                <>
                  <hr className="mb-3 border-top-1 border-none surface-border" />
                  <div className="p-3 m-0 flex align-items-center justify-content-between">
                    <span className="text-xs font-bold uppercase text-secundario">
                      M.P
                    </span>
                    <Link to="/create-project" className="no-underline">
                      <i className="pi pi-plus-circle" />
                    </Link>
                  </div>
                  {/*Aca voy a hacer el mapeo de los proyectos, que solo van a mostrar los 2 pimeros y un boton del color del proyecto*/}
                  {
                    projectList.length > 0 ? (
                      <ul className="list-none py-3 pl-0 m-0">
                        {projectList.map((project: any) => {
                          return (
                            <li key={project.name}>
                              <Link
                                to={`/projects/${project.id}`}
                                className="flex align-items-center justify-content-between cursor-pointer py-3 px-3 border-round text-700 hover:surface-100 hover:text-primario transition-duration-150 transition-colors w-full p-ripple no-underline text-secundario"
                              >
                                <div className="flex align-items-center">
                                  <BulletColor backgroundColor={project.color} />
                                  <span className="font-medium">{project.name.substring(0, 2)}</span>
                                </div>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null
                  }
                </>
              ) : (
                <>
                  <hr className="mb-3 border-top-1 border-none surface-border" />
                  <div className="p-3 m-0 flex align-items-center justify-content-between">
                    <span className="text-xs font-bold uppercase text-secundario">
                      Mis Proyectos
                    </span>
                    <Link to="/create-project" className="no-underline">
                      <i className="pi pi-plus-circle" />
                    </Link>
                  </div>
                  {
                    projectList.length > 0 ? (
                      <ul className="list-none py-3 pl-0 m-0">
                        {projectList.map((project: any) => {
                          return (
                            <li key={project.name}>
                              <Link
                                to={`/projects/${project.id}`}
                                className="flex align-items-center justify-content-between cursor-pointer py-3 px-3 border-round text-700 hover:surface-100 hover:text-primario transition-duration-150 transition-colors w-full p-ripple no-underline text-secundario"
                              >
                                <div className="flex align-items-center">
                                  <BulletColor backgroundColor={project.color} />
                                  <span className="font-medium">{project.name}</span>
                                </div>
                                <i className="pi pi-ellipsis-h" />
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null
                  }
                </>
              )}
            </div>
            {userLogged()}
          </div>
        </div>
      </div>
    </div>
  )
}
