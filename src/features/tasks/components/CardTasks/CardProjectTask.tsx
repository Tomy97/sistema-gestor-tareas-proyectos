import { useEffect } from 'react'
import { Card } from 'primereact/card'
import { CardHeader } from './CardHeader'
import { CardFooter } from './CardFooter'
import { Task } from '../../../../types/Task'
import { useDrag } from 'react-dnd'
import { useState } from 'react'

interface CardProjectTaskProps {
  task: Task
}

export const CardProjectTask = ({
                                  task
                                }: CardProjectTaskProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const [{ isDragging, initialClientOffset, clientOffset }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      initialClientOffset: monitor.getInitialClientOffset(),
      clientOffset: monitor.getClientOffset()
    }),
    end: (item, monitor) => {
      const offset = monitor.getClientOffset()
      if (offset) {
        setPosition({ x: offset.x, y: offset.y })
      }
    }
  }))

  const cardStyle = {
    position: isDragging ? 'absolute' : 'relative',
    top: isDragging && position.y,
    left: isDragging && position.x,
    cursor: isDragging ? 'grabbing' : 'pointer',
    zIndex: isDragging ? 1000 : 'auto',
    transform: isDragging ? 'rotate(5deg)' : 'none' // Optional: adds a small rotation effect while dragging
  }

  useEffect(() => {
    if (isDragging && clientOffset && initialClientOffset) {
      const xOffset = clientOffset.x - initialClientOffset.x;
      const yOffset = clientOffset.y - initialClientOffset.y;
      setPosition({ x: xOffset, y: yOffset });
    }
  }, [isDragging, clientOffset, initialClientOffset]);
  return (
    <div ref={drag} className="card-wrapper relative" style={cardStyle}>
      <div className={`card-dragger ${isDragging ? 'active' : ''}`} />
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
    </div>
  )
}
