import { TagStatus } from '../CustomTags/TagStatus'
import { TagPriority } from '../CustomTags/TagPriority'
import { useAppDispatch } from '../../../../app/hooks'
import { deleteTask } from '../../slices/store'
import { Button } from 'primereact/button'

interface CardHeaderProps {
  status: string
  priority: string
  id: string
}

export const CardHeader = ({ status, priority, id }: CardHeaderProps) => {
  const dispatch = useAppDispatch()
  const handleDeleteTask = async (id: string) => {
    dispatch(deleteTask(id))
  }
  return (
    <div className="flex justify-content-between align-items-center p-3 pb-0">
      {
        status !== 'done' ? (
          <>
            <TagPriority priority={priority} />
          </>
        ) : (
          <TagStatus status={status} priority={priority} />
        )
      }
      <i
        className="pi pi-trash text-red-500 font-medium cursor-pointer"
        onClick={() => handleDeleteTask(id)}
      />
    </div>
  )
}
