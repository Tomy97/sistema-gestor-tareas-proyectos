import { useCallback, useEffect, useState } from 'react'
import { BulletColor } from '../../../ui/components/BulletColor'
import { Badge } from 'primereact/badge'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setVisibilityCreateTask } from '../slices/store'

interface HeaderProps {
  text: string
  status: string
  count: number
}

export const Header = ({ text, status, count }: HeaderProps) => {
  const [bulletColor, setBulletColor] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleOpenDialog = (val: boolean) => {
    dispatch(setVisibilityCreateTask(val))
  }

  useEffect(() => {
    if (status === 'to-do') {
      setBulletColor('#5030E5')
    } else if (status === 'in-progress') {
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
            value={count}
            severity="info"
            className="ml-2"
            style={{ background: '#E0E0E0', color: '#625F6D' }}
          />
        </div>
        {status === 'to-do' ? (
          <i className="pi pi-plus-circle text-terciario cursor-pointer" onClick={e => handleOpenDialog(true)} />
        ) : null}
      </div>
      <div
        className="mb-3 mx-4 border-bottom-2"
        style={{ borderBlockColor: bulletColor }}
      />
    </>
  )
}