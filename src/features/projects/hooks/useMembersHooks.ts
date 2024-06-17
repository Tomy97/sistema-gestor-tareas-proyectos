import type { Member, MembersGroup } from '../../../types/member'
import membersMock from '../../../mock/members.json'

const { developers } = membersMock

export const useGroupedMembers: MembersGroup[] = developers
  .map((member: Member) => {
    return {
      label: member.rol,
      items: developers
        .filter((d: Member) => d.rol === member.rol)
        .map((d: Member) => ({ ...d, label: d.name, value: d })),
    }
  })
  .filter(
    (member: MembersGroup, index: number, self: MembersGroup[]) =>
      self.findIndex((t: MembersGroup) => t.label === member.label) === index,
  )
