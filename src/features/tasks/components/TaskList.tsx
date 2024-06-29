import React from 'react'
import { Section } from './Section'
import { useAppSelector } from '../../../app/hooks'
import { CrateTaskDialog } from './CreateTaskDialog'

export const TaskList: React.FC = () => {
  const statuses = ['todo', 'inProgress', 'done']
  const taskStore = useAppSelector(({ tasks }) => tasks)

  return (
    <>
      <div className="flex gap-8 justify-content-center">
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
        taskStore.visibility ? <CrateTaskDialog /> : null
      }
    </>
  )
}