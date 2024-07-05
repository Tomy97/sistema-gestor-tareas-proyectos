import { Card } from 'primereact/card'
import { CardHeader } from './CardHeader'
import { Task } from '../../../../types/Task'

// Todo: Cuando este en codiciones, agregarle la lista de miembros para el footer
interface CardProjectTaskProps {
  task: Task
}

export const CardProjectTask = ({
                                  task
                                }: CardProjectTaskProps) => {
  return (
    <Card
      title={task.name}
      className="text-primario py-4 px-2 w-full xl:w-25rem mb-5"
      header={<CardHeader status={task.status} priority={task.priority} key={task.id} id={task.id} />}
    >
      <span className="text-secundario">{task.description}</span>
    </Card>
  )
}
