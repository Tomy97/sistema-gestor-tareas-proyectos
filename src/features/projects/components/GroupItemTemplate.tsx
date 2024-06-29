import type { MembersGroup } from '../../../types/Member'

export const GroupItemTemplate = (option: MembersGroup) => {
  return (
    <div className="flex align-items-center">
      <div>{option.label} </div>
    </div>
  )
}
