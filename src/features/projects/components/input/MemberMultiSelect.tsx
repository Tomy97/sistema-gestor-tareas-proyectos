import { MultiSelect } from 'primereact/multiselect'
import { useGroupedMembers } from '../../hooks/useMembersHooks'
import { GroupItemTemplate } from '../GroupItemTemplate'
import type { Member } from '../../../../types/member'

interface MemberMultiSelectProps {
  label: string
  value: Member[] | null
  onChange: (e: any) => void
}

export const MemberMultiSelect = (props: MemberMultiSelectProps) => {
  const groupedMembers = useGroupedMembers

  const membersTemplate = (option: Member) => {
    return (
      <div className="flex align-items-center">
        <div>
          {option.name} ({option.seniority})
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-column justify-content-center">
      <label className="mb-2">{props.label}</label>
      <MultiSelect
        value={props.value}
        options={groupedMembers}
        onChange={(e) => props.onChange(e)}
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        itemTemplate={membersTemplate}
        optionGroupTemplate={GroupItemTemplate}
        display="chip"
        className="w-full"
      />
    </div>
  )
}
