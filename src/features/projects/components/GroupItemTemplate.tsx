import type { MembersGroup } from '../../../types/member'

export const GroupItemTemplate = (option: MembersGroup) => {
  return (
    <div className="flex align-items-center">
      <div>{option.label} </div>
    </div>
  )
}
