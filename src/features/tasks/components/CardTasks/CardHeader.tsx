import { TagStatus } from '../CustomTags/TagStatus'
import { TagPriority } from '../CustomTags/TagPriority'
import { useAppDispatch } from '../../../../app/hooks'

interface CardHeaderProps {
  status: string
  priority: string
  id: string
}

export const CardHeader = ({ status, priority, id }: CardHeaderProps) => {
  const dispatch = useAppDispatch()

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
    </div>
  )
}
