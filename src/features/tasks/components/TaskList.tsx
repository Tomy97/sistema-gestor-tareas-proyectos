import React, { useEffect, useState } from 'react'
import { Section } from './Section'
import { useAppSelector } from '../../../app/hooks'
import { CrateTaskDialog } from './CreateTaskDialog'
import { Project } from '../../../types/Project'
import { TaskState } from '../slices/store'
import { Task } from '../../../types/Task'

interface TaskListProp {
  id: string
}

export const TaskList: React.FC<{ id: string }> = ({ id }: TaskListProp) => {
  const [items, setItems] = useState<Project[]>([]);
  const statuses: string[] = ['to-do', 'in-progress', 'done']
  const taskStore: TaskState = useAppSelector(({ tasks }) => tasks)
  const tasks: Task[] = items.find(project => project.id === id)?.tasks || []

  // useEffect(() => {
  //   const data: Project[] = JSON.parse(localStorage.getItem('projects') || '[]') as Project[]
  //   if (data) {
  //     setProject(data)
  //   }
  // }, [])


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('projects'));
    if (items) {
      setItems(items);
    }
  }, []);
  return (
    <>
      <div className="block xl:flex gap-8 justify-content-center">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
          />
        ))}
      </div>
      {
        taskStore.visibility ? <CrateTaskDialog id={id} /> : null
      }
    </>
  )
}