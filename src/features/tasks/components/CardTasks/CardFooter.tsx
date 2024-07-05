import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import type { T } from '../../../../types/Generic'

interface CardFooterProps {
  memberList: T[]
}
export const CardFooter = ({ memberList }: CardFooterProps) => {
  return (
    <div className="flex justify-content-between">
      <AvatarGroup>
        {memberList.map((member) => (
          <Avatar
            key={member.id}
            label={member.name.charAt(0)}
            size="large"
            className="bg-pills text-white cursor-pointer"
            shape="circle"
          />
        ))}
      </AvatarGroup>

      <div>
        comments
        <div>comments</div>
      </div>
    </div>
  )
}
