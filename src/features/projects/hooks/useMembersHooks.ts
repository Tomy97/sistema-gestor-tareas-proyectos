import type { MembersGroup } from '../../../types/Member'
import type { T } from '../../../types/Generic'
import { DeveloperProject } from '../../../types/DeveloperProject'

interface GroupedMembers extends DeveloperProject {
  label: string
  value: DeveloperProject
}

export const useGroupedMembers = (developers: DeveloperProject[]): MembersGroup[] => {
  return developers.map((member: T): MembersGroup => ({
    label: member.rol,
    items: developers
      .filter((d: DeveloperProject): boolean => d.rol === member.rol)
      .map((d: DeveloperProject): GroupedMembers => ({ ...d, label: d.name, value: d }))
  }))
    .filter(
      (member: MembersGroup, index: number, self: MembersGroup[]): boolean =>
        self.findIndex((t: MembersGroup): boolean => t.label === member.label) === index
    )
}