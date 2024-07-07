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
  task?: Task
}

export const TaskList: React.FC<{ id: string, task: Task }> = ({ id, task }: TaskListProp) => {
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
      <div className="block xl:flex gap-8 justify-content-center">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            projectId={id}
          />
        ))}
      </div>
      {
        taskStore.visibility ? <TaskDialog id={id} /> : null
      }
    </>
  )
}