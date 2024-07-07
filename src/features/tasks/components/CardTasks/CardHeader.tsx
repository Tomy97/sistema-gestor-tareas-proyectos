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
    <div className="flex justify-content-between align-items-center px-3">
      <div>
        {
          status !== 'done' ? (
            <>
              <TagPriority priority={priority} />
            </>
          ) : (
            <TagStatus status={status} priority={priority} />
          )
        }
      </div>
      <div>
        <Button icon="pi pi-trash" rounded aria-label="Filter" severity="danger" onClick={() => handleDeleteTask(id)} />
      </div>
    </div>
  )
}
