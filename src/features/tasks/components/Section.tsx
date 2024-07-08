import { Header } from './Header'
import { CardProjectTask } from './CardTasks/CardProjectTask'
import { Task } from '../../../types/Task'
import { useDrop } from 'react-dnd'
import { Project } from '../../../types/Project'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setVisibilityViewTask, taskSelected, updateTaskStatus } from '../slices/store'
import { ViewTaskDialog } from './ViewDialog/ViewTaskDialog'

interface SectionProps {
  tasks: Task[]
  status: string
  projectId: string
}

export const Section = ({
                          status,
                          tasks,
                          projectId
                        }: SectionProps) => {
  const text: string =
    status === 'to-do'
      ? 'Por Hacer'
      : status === 'in-progress'
        ? 'En Progreso'
        : 'Hecho'


  const taskToMap: Task[] = tasks.filter((task: Task): boolean => task.status === status)
  const dispatch = useAppDispatch()
  const taskStore = useAppSelector(({ tasks }) => tasks)

  const [_, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item: Task) => (addItemToSection(item)),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }))

  const addItemToSection = (task: Task): void => {
    dispatch(updateTaskStatus({ id: task.id, status }))
  }

  return (
    <>
      <div
        style={{ backgroundColor: '#F5F5F5' }}
        className="border-round w-full xxl:w-23rem"
        ref={drop}
      >
        <Header text={text} status={status} count={taskToMap.length} />
        <div className="flex align-items-center flex-column justify-content-center">
          {
            taskToMap.map((task: Task) => (
              <CardProjectTask key={task.id} task={task} />
            ))
          }
        </div>
      </div>
      {
        taskStore.visibilityViewTask ?
          <ViewTaskDialog visible={taskStore.visibilityViewTask} task={taskStore.taskSelected!} /> : null
      }
    </>
  )
}
