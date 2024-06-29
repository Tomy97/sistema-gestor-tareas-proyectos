import type { MembersGroup } from '../../../types/Member'
import membersMock from '../../../mock/members.json'
const { developers } = membersMock
import type { T } from '../../../types/Generic'

export const useGroupedMembers: MembersGroup[] = developers
  .map((member: T): MembersGroup => ({
    label: member.rol,
    items: developers
      .filter((d) => d.rol === member.rol)
      .map((d) => ({ ...d, label: d.name, value: d })),
  }))
  .filter(
    (member: MembersGroup, index: number, self: MembersGroup[]) =>
      self.findIndex((t: MembersGroup) => t.label === member.label) === index,
  );