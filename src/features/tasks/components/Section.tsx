import { Header } from './Header'
import { CardProjectTask } from './CardTasks/CardProjectTask'
import { Task } from '../../../types/Task'

interface SectionProps {
  tasks: Task[]
  status: string
  //memeberList: T[]
}

export const Section = ({
                          status,
                          tasks
                          // memeberList
                        }: SectionProps) => {
  const text: string =
    status === 'to-do'
      ? 'Por Hacer'
      : status === 'in-progress'
        ? 'En Progreso'
        : 'Hecho'


  const taskToMap: Task[] = tasks.filter((task: Task): boolean => task.status === status)

  return (
    <div
      style={{ backgroundColor: '#F5F5F5' }}
      className="border-round w-full xxl:w-23rem"
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
  )
}
