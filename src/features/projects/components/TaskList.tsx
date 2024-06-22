import { useEffect, useState } from 'react'
import { BulletColor } from '../../../ui/components/BulletColor'
import { Badge } from 'primereact/badge'

interface TaskListProps {
  tasks: string[]
  setTasks: (tasks: string[]) => void
}
export const TaskList = ({ tasks, setTasks }: TaskListProps) => {
  const [todos, setTodos] = useState<string[]>([])
  const [inProgress, setInProgress] = useState<string[]>([])
  const [done, setDone] = useState<string[]>([])

  useEffect(() => {}, [])
  const statuses = ['todo', 'inProgress', 'done']
  return (
    <div className="flex gap-8 justify-content-center">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todo={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  )
}

interface SectionProps {
  status: string
  tasks: string[]
  setTasks: (tasks: string[]) => void
  todo: string[]
  inProgress: string[]
  done: string[]
}
const Section = ({
  status,
  tasks,
  setTasks,
  todo,
  inProgress,
  done,
}: SectionProps) => {
  const text =
    status === 'todo'
      ? 'Por Hacer'
      : status === 'inProgress'
        ? 'En Progreso'
        : 'Hecho'
  return (
    <div
      style={{ backgroundColor: '#F5F5F5', width: 354 }}
      className="border-round"
    >
      <Header text={text} status={status} count={2} />
    </div>
  )
}

interface HeaderProps {
  text: string
  status: string
  count: number
}
const Header = ({ text, status, count }: HeaderProps) => {
  const [bulletColor, setBulletColor] = useState<string>('')

  useEffect(() => {
    if (status === 'todo') {
      setBulletColor('#5030E5')
    } else if (status === 'inProgress') {
      setBulletColor('#FFB946')
    } else {
      setBulletColor('#27AE60')
    }
  }, [status])
  return (
    <>
      <div className="flex py-2 px-5 align-items-center justify-content-between">
        <div className="flex align-items-center">
          <BulletColor backgroundColor={bulletColor} />
          <h4 className="text-primario">{text}</h4>
          <Badge
            value="7"
            severity="info"
            className="ml-2"
            style={{ background: '#E0E0E0', color: '#625F6D' }}
          />
        </div>
        {status === 'todo' ? (
          <>
            <i className="pi pi-plus-circle text-terciario" />
          </>
        ) : null}
      </div>
      <div className="mb-3 mx-4 border-bottom-2" style={{ borderBlockColor: bulletColor }} />
    </>
  )
}
