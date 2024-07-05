import { Tag } from 'primereact/tag'
import { useEffect, useState } from 'react'

interface TagPriorityProps {
  priority: string
}

export const TagPriority = ({ priority }: TagPriorityProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [tag, setTag] = useState<string>('')
  useEffect(() => {
    switch (priority) {
      case 'low':
        setBackgroundColor('#dfa874b9')
        setColor('#D58D49')
        setTag('Baja')
        break
      case 'medium':
        setBackgroundColor('#06b6d4')
        setColor('#FFF')
        setTag('Media')
        break
      case 'high':
        setBackgroundColor('#d8727ca4')
        setColor('#D8727D')
        setTag('Alta')
        break
      default:
        setBackgroundColor('')
        setColor('')
        break
    }
  }, [priority])
  return (
    <Tag style={{ backgroundColor: backgroundColor, color: color }}>
      {tag}
    </Tag>
  )
}
