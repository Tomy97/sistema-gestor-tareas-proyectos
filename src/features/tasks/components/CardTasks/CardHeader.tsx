import { TagStatus } from '../CustomTags/TagStatus'
import { TagPriority } from '../CustomTags/TagPriority'
import { useAppDispatch } from '../../../../app/hooks'
import { deleteTask } from '../../slices/store'

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
        {/* Todo: Agrarle la funcionalidad para editar o eliminar, que se habra un desplegable o un menusito*/}
        <i className="pi pi-trash cursor-pointer" onClick={() => handleDeleteTask(id)} />
      </div>
    </div>
  )
}
