import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useParams } from 'react-router-dom'
import { TaskList } from '../../tasks/components/TaskList'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Project } from '../../../types/Project'
import type { T } from '../../../types/Generic'
import React, { useEffect, useState } from 'react'
import { getProjects, updateProjectName } from '../slices/store'
import { InputText } from 'primereact/inputtext'

export const ProjectsViews = () => {
  const { id } = useParams()
  const projectStore: Project[] = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  const project: Project | undefined = projectStore.find((project: Project): boolean => project.id === id)
  const [editMode, setEditMode] = useState<boolean>(false)

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

  const handleEditMode = (val: boolean) => {
    setEditMode(val)
  }


  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProjectName({ id: project.id, name: e.target.value }))
  }


  return (
    <div className="p-5 w-full">
      <div className="flex justify-content-between mb-5">
        <div>
          {
            editMode ? (
              <>
                <h3 className="text-primario">Nuevo nombre del proyecto</h3>
                <InputText
                  onChange={(e) => handleProjectNameChange(e)}
                  placeholder={project.name}
                  autoFocus
                  onBlur={() => handleEditMode(!editMode)}
                />
              </>
            ) : (
              <>
                <h1 className="text-primario">
                  {project.name}
                  <i className="pi pi-pen-to-square ml-5 cursor-pointer text-terciario" onClick={() => handleEditMode(!editMode)} />
                </h1>
              </>
            )
          }
        </div>
        <div className="flex align-items-center text-terciario font-bold justify-content-end md:justify-content-center">
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
      <TaskList id={id!} />
    </div>
  )
}
