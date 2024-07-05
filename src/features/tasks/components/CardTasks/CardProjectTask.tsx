import { Card } from 'primereact/card'
import { CardHeader } from './CardHeader'
import { CardFooter } from './CardFooter'
import { Task } from '../../../../types/Task'

interface CardProjectTaskProps {
  task: Task
}

export const CardProjectTask = ({
                                  task
                                }: CardProjectTaskProps) => {
  return (
    <Card
      title={task.name}
      className="text-primario py-4 px-2 w-full xl:w-25rem mb-5 cursor-pointer"
      header={<CardHeader status={task.status} priority={task.priority} key={task.id} id={task.id} />}
      footer={<CardFooter developerAssigment={task.developerAssigned!} />}
    >
      {
        task.image ? (<img src={task.image} alt={task.name} className="w-full h-40" />)
          : (<span className="text-secundario">{task.description}</span>)
      }

    </Card>
  )
}
