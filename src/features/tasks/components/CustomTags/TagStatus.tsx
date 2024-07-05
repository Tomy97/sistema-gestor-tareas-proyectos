import { Tag } from 'primereact/tag'
import { useEffect, useState } from 'react'

interface TagStatusProps {
  status: string
  priority?: string
}

export const TagStatus = ({ status }: TagStatusProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [tag, setTag] = useState<string>('')

  useEffect(() => {
    switch (status) {
      case 'done':
        setBackgroundColor('#83c29da1')
        setColor('#68B266')
        setTag('Completado')
        break
      default:
        setBackgroundColor('')
        setColor('')
        break
    }
  }, [status])

  return (
    <Tag style={{ backgroundColor: backgroundColor, color: color }}>
      {tag}
    </Tag>
  )
}
