import React from 'react'
import { Section } from './Section'
import { useAppSelector } from '../../../app/hooks'
import { CrateTaskDialog } from './CreateTaskDialog'

interface TaskListProp {
  id: string
}

export const TaskList: React.FC<{ id: string }> = ({ id }: TaskListProp) => {
  const statuses: string[] = ['todo', 'inProgress', 'done']
  const taskStore = useAppSelector(({ tasks }) => tasks)

  return (
    <>
      <div className="block xl:flex gap-8 justify-content-center">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            todo={taskStore.todo}
            inProgress={taskStore.inProgress}
            done={taskStore.done}
          />
        ))}
      </div>
      {
        taskStore.visibility ? <CrateTaskDialog id={id} /> : null
      }
    </>
  )
}