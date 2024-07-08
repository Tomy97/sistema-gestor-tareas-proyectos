import { useEffect, useState } from 'react'
import { Logo } from './Logo'

import { Sidebar } from 'primereact/sidebar'
import { useWindowSize } from 'react-use'
import type { Menu } from '../types/menu'
import { Link } from 'react-router-dom'
import { BulletColor } from './BulletColor'

const ComponentLogo = () => {
  return (
    <>
      <Logo />
      <span className="font-bold text-xl text-gray-900 ml-2">Project M.</span>
    </>
  )
}
export const MobileMenu = () => {
  const { width } = useWindowSize()
  const [visible, setVisible] = useState(false)

  const menu: Menu[] = [
    {
      icon: 'home',
      label: 'Dashboard',
      to: '/'
    }
  ]

  const projects = localStorage.getItem('projects')
  const projectList = JSON.parse(projects || '[]')

  useEffect(() => {
    if (width > 1024) {
      setVisible(false)
    }
  }, [width])
  return (
    <>
      <div className="flex justify-content-between align-items-center p-4 border-bottom-1 border-none surface-border">
        <div className="flex align-items-center">
          <ComponentLogo />
        </div>
        <div>
          <i
            className="pi pi-bars"
            onClick={() => setVisible(true)}
            style={{ fontSize: '1.1rem' }}
          />
        </div>
      </div>

      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="w-full"
        content={({ closeIconRef, hide }) => (
          <div className="min-h-screen flex relative lg:static surface-ground">
            <div
              className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none w-full">
              <div className="flex flex-column h-full">
                <div
                  className="flex align-items-center justify-content-between p-4 flex-shrink-0 border-bottom-1 border-none surface-border">
                  <div className="flex align-items-center">
                    <ComponentLogo />
                  </div>
                  <span>
                    <i
                      ref={closeIconRef}
                      onClick={(e) => hide(e)}
                      className="pi pi-times"
                      style={{ fontSize: '1.1rem' }}
                    />
                  </span>
                </div>
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
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                <div className="p-3 m-0 flex align-items-center justify-content-between">
                  <span className="text-xs font-bold uppercase text-">
                    Mis Proyectos
                  </span>
                  <Link to="/create-project" className="no-underline">
                    <i className="pi pi-plus-circle" />
                  </Link>
                </div>
                {
                  projectList.length > 0 ? (
                    <ul className="list-none p-3 m-0">
                      {projectList.map((project: any) => {
                        return (
                          <li key={project.name}>
                            <Link
                              to={`/projects/${project.id}`}
                              className="flex align-items-center justify-content-between cursor-pointer py-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full p-ripple no-underline"
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
              </div>
            </div>
          </div>
        )}
      />
    </>
  )
}
