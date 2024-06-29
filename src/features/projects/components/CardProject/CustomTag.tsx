import { Tag } from 'primereact/tag'
import { useEffect, useState } from 'react'

interface CustomTagProps {
  status: string
  priority?: string
}

export const CustomTag = ({ status, priority }: CustomTagProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [color, setColor] = useState<string>('')

  useEffect(() => {
    switch (status || priority) {
      case 'low':
        setBackgroundColor('#dfa874b9')
        setColor('#D58D49')
        break
      case 'high':
        setBackgroundColor('#d8727ca4')
        setColor('#D8727D')
        break
      case 'done':
        setBackgroundColor('#83c29da1')
        setColor('#68B266')
        break
      default:
        setBackgroundColor('')
        setColor('')
        break
    }
  }, [status, priority])

  return (
    <Tag style={{ backgroundColor: backgroundColor, color: color }}>
      {status || priority ? status || priority : null}
    </Tag>
  )
}
