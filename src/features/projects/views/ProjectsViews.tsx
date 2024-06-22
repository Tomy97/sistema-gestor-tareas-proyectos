import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useParams } from 'react-router-dom'
import type { Member } from '../../../types/member'
import { TaskList } from '../components/TaskList'

export const ProjectsViews = () => {
  const { id } = useParams()

  // Todo: Cambiar esto para que haga la implementacion de redux y tome los datos de ahi
  const projects = localStorage.getItem('projects')
  const projectList = JSON.parse(projects || '[]')

  const project = projectList.find((project: Member) => project.id === id)

  if (projectList.length === 0) {
    return <div className="p-5">No hay proyectos</div>
  } else if (!project) {
    return <div className="p-5">Proyecto no encontrado</div>
  }

  const membersToShow = project.members.slice(0, 4)
  const remainingMembersCount = project.members.length - 4

  return (
    <div className="p-5 w-full">
      <div className="flex flex-column md:flex-row justify-content-between mb-5">
        {/* TODO: 
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
            {membersToShow.map((member: Member, index: number) => (
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

      {/* // todo: hacer el drag and drop para cada tarea que se va a ir creando */}
      <TaskList />
    </div>
  )
}
