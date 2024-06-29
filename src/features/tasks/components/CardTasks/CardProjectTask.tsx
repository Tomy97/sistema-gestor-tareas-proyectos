import { Card } from 'primereact/card'
import { CardHeader } from '../../../projects/components/CardProject/CardHeader'
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
      className="text-primario p-5"
      header={<CardHeader />}
    >
      <span className="text-secundario">{task.description}</span>
    </Card>
  )
}
