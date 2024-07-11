import { useEffect, CSSProperties } from 'react'
import { Card } from 'primereact/card'
import { CardHeader } from './CardHeader'
import { CardFooter } from './CardFooter'
import { Task } from '../../../../types/Task'
import { useDrag } from 'react-dnd'
import { useState } from 'react'
import { setVisibilityViewTask, taskSelected } from '../../slices/store'
import { useAppDispatch } from '../../../../app/hooks'

interface CardProjectTaskProps {
  task: Task
}

export const CardProjectTask = ({
                                  task
                                }: CardProjectTaskProps) => {
  const dispatch = useAppDispatch()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const [{ isDragging, initialClientOffset, clientOffset }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      initialClientOffset: monitor.getInitialClientOffset(),
      clientOffset: monitor.getClientOffset()
    }),
    end: (_, monitor) => {
      const offset = monitor.getClientOffset()
      if (offset) {
        setPosition({ x: offset.x, y: offset.y })
      }
    }
  }))

  const cardStyle: CSSProperties = {
    position: isDragging ? 'absolute' : 'relative',
    top: isDragging ? `${position.y}px` : 'auto',
    left: isDragging ? `${position.x}px` : 'auto',
    cursor: isDragging ? 'grabbing' : 'pointer',
    zIndex: isDragging ? 1000 : 'auto',
    transform: isDragging ? 'rotate(5deg)' : 'none'
  }

  useEffect(() => {
    if (isDragging && clientOffset && initialClientOffset) {
      const xOffset = clientOffset.x - initialClientOffset.x
      const yOffset = clientOffset.y - initialClientOffset.y
      setPosition({ x: xOffset, y: yOffset })
    }
  }, [isDragging, clientOffset, initialClientOffset])

  const handleVisibilityTask = (visibility: boolean, task: Task) => {
    dispatch(setVisibilityViewTask(visibility))
    dispatch(taskSelected(task))
  }
  return (
    <div ref={drag} className="card flex card-wrapper relative" style={cardStyle}
         onClick={() => handleVisibilityTask(true, task)}>
      <div className={`card-dragger ${isDragging ? 'active' : ''}`} />
      <Card
        title={task.name}
        className="text-primario w-20rem md:w-14rem xl:w-20rem mb-3 px-2 cursor-pointer"
        header={<CardHeader status={task.status} priority={task.priority} key={task.id} id={task.id} />}
        footer={<CardFooter developerAssigment={task.developerAssigned!} />}
      >
        {
          task.image ? (<img src={task.image} alt={task.name} className="w-full h-40" />)
            : (<span className="text-secundario">{task.description}</span>)
        }
      </Card>
    </div>
  )
}
