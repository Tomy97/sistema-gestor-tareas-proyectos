import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useParams } from 'react-router-dom'
import { TaskList } from '../../tasks/components/TaskList'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Project } from '../../../types/Project'
import type { T } from '../../../types/Generic'
import { useEffect } from 'react'
import { getProjects } from '../slices/store'

export const ProjectsViews = () => {
  const { id } = useParams()
  const projectStore: Project[] = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  const project: Project | undefined = projectStore.find((project: Project): boolean => project.id === id)

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  if (projectStore.length === 0) {
    return <div className="p-5">No hay proyectos</div>
  } else if (!project) {
    return <div className="p-5">Proyecto no encontrado</div>
  }

  const membersToShow: T[] = project?.members.slice(0, 4)
  const remainingMembersCount: number = project?.members.length - 4
  return (
    <div className="p-5 w-full">
      <div className="flex justify-content-between mb-5">
        {/* Todo:
          Esta parte del nombre y el icono de edit va a haber que hacer una validacion para que cuando le doy al boton de editar, me salga el input para el editado y el guardado del mismo
         */}
        <div>
          <h1 className="text-primario">
            {project.name}
            <i className="pi pi-pen-to-square ml-5 cursor-pointer" />
          </h1>
        </div>
        <div className="flex align-items-center text-terciario font-bold justify-content-end md:justify-content-center">
          {/* // Todo: Para cuando se haga la aplicacion full stack hacer que esto mande un token por mail, para poder ingresar al projecto */}
          <AvatarGroup>
            {membersToShow.map((member: T, index: number) => (
              <Avatar
                key={index}
                label={member.name.charAt(0)}
                size="large"
                className="bg-pills text-white cursor-pointer"
                shape="circle"
              />
            ))}
            {remainingMembersCount > 0 && (
              <Avatar
                label={`+${remainingMembersCount}`}
                size="large"
                className="bg-pills cursor-pointer text-white"
                shape="circle"

              />
            )}
          </AvatarGroup>
        </div>
      </div>
      <TaskList id={id ? id : '0' } />
    </div>
  )
}
