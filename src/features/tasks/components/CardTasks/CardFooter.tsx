import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import type { T } from '../../../../types/Generic'

interface CardFooterProps {
  developerAssigment: T
}

export const CardFooter = ({ developerAssigment }: CardFooterProps) => {
  return (
    <div className="flex justify-content-between">
      <div>
      Asignado a:
          <span className="text-primario font-bold">
            <p>
              {developerAssigment.name}
            </p>
          </span>
      </div>
    </div>
  )
}
