import { Header } from './Header'
import { CardProjectTask } from './CardTasks/CardProjectTask'
import { Task } from '../../../types/Task'
import { useDrop } from 'react-dnd'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { updateTaskStatus } from '../slices/store'
import { ViewTaskDialog } from './ViewDialog/ViewTaskDialog'

interface SectionProps {
  tasks: Task[]
  status: string
}

export const Section = ({
                          status,
                          tasks
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
        style={{
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: 'column',
          height: '81vh'
        }}
        className="border-round w-23rem md:w-17rem xl:w-23rem relative"
        ref={drop}
      >
        <Header text={text} status={status} count={taskToMap.length} />
        <div
          style={{ flexGrow: 1, overflowY: 'auto', scrollbarWidth: 'thin'}}
          className="task-list"
        >
          <div className="flex align-items-center flex-column justify-content-center">
            {
              taskToMap.map((task: Task) => (
                <CardProjectTask key={task.id} task={task} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
