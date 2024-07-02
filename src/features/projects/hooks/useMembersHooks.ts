import type { MembersGroup } from '../../../types/Member'
import type { T } from '../../../types/Generic'
import { DeveloperProject } from '../../../types/DeveloperProject'

export const useGroupedMembers = (developers: DeveloperProject[]) => {
  return developers.map((member: T): MembersGroup => ({
    label: member.rol,
    items: developers
      .filter((d) => d.rol === member.rol)
      .map((d) => ({ ...d, label: d.name, value: d }))
  }))
    .filter(
      (member: MembersGroup, index: number, self: MembersGroup[]) =>
        self.findIndex((t: MembersGroup) => t.label === member.label) === index
    )
}