import { Header } from './Header'
import { CardProjectTask } from './CardTasks/CardProjectTask'
import { Task } from '../../../types/Task'
// import { T } from '../../../types/Generic'

interface SectionProps {
  todo: Task[]
  inProgress: Task[]
  done: Task[]
  status: string
  //memeberList: T[]
}

export const Section = ({
                          status,
                          todo,
                          inProgress,
                          done,
                          // memeberList
                        }: SectionProps) => {
  const text: string =
    status === 'todo'
      ? 'Por Hacer'
      : status === 'inProgress'
        ? 'En Progreso'
        : 'Hecho'

  let taskToMap = todo

  if (status === 'inProgress') {
    taskToMap = inProgress
  }

  if (status === 'done') {
    taskToMap = done
  }
  return (
    <div
      style={{ backgroundColor: '#F5F5F5' }}
      className="border-round w-full xl:w-23rem"
    >
      <Header text={text} status={status} count={taskToMap.length} />
      {
        taskToMap.map((task) => (
          <CardProjectTask task={task}  />
        ))
      }
    </div>
  )
}
