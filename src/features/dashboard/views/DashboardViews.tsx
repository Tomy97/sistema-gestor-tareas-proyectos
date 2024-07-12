import { ProjectCard } from '../../projects/components/ProjectCard'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Project } from '../../../types/Project'
import { useEffect } from 'react'
import { getProjects } from '../../projects/slices/store'
import { Link } from 'react-router-dom'

export const DashboardViews = () => {
  const projectStore = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProjects())
  }, [])
  return (
    <div className="p-5">
      <h2 className="text-primario text-center">
        Aplicación de Gestión de Usuarios y Productos
      </h2>

      <div className="col-12">
        <h3 className="text-primario">
          Mis Proyectos
        </h3>
      </div>
      <div className="flex">
        {
          projectStore.map((project: Project, index: number) => (
            <Link to={`/projects/${project.id}`} className="col-3 no-underline" key={index}>
              <ProjectCard project={project} />
            </Link>
          ))
        }
        <div className="col-3">
          <Link to="/create-project" className='no-underline'>
            <div
              className="new-project-card cursor-pointer flex justify-content-center align-items-center">
              <i className="pi pi-plus-circle text-3xl" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
