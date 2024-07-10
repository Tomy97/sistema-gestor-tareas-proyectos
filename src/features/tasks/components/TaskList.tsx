import React, { useEffect, useState } from 'react'
import { Section } from './Section'
import { useAppSelector } from '../../../app/hooks'
import { TaskDialog } from './TaskDialog'
import { Project } from '../../../types/Project'
import { TaskState } from '../slices/store'
import { Task } from '../../../types/Task'
import { getItem } from '../../../utils/localStorage'

interface TaskListProp {
  id: string
}

export const TaskList: React.FC<{ id: string }> = ({ id }: TaskListProp) => {
  const [items, setItems] = useState<Project[]>([])
  const statuses: string[] = ['to-do', 'in-progress', 'done']
  const taskStore: TaskState = useAppSelector(({ tasks }) => tasks)
  const tasks: Task[] = items.find(project => project.id === id)?.tasks || []

  useEffect(() => {
    const projects = getItem('projects')
    setItems(projects)
  }, [taskStore.tasks])
  return (
    <>
      {statuses.map((status: string, index: number) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          projectId={id}
        />
      ))}
      {
        taskStore.visibility ? <TaskDialog id={id} /> : null
      }
    </>
  )
}