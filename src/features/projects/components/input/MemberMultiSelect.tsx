import { MultiSelect } from 'primereact/multiselect'
import { useGroupedMembers } from '../../hooks/useMembersHooks'
import { GroupItemTemplate } from '../GroupItemTemplate'
import type { T } from '../../../../types/Generic'

interface MemberMultiSelectProps {
  label: string
  value: T[] | null
  onChange: (e: any) => void
}

export const MemberMultiSelect = (props: MemberMultiSelectProps) => {
  const groupedMembers = useGroupedMembers

  const membersTemplate = (option: T) => {
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
