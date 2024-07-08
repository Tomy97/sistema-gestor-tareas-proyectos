import { MultiSelect } from 'primereact/multiselect'
import { useGroupedMembers } from '../../hooks/useMembersHooks'
import { GroupItemTemplate } from '../GroupItemTemplate'
import type { T } from '../../../../types/Generic'
import { DeveloperProject } from '../../../../types/DeveloperProject'
import { MembersGroup } from '../../../../types/Member'
import { Dropdown } from 'primereact/dropdown'

interface MemberMultiSelectProps {
  label: string
  value: T[] | null
  developerOption: any[]
  onChange: (e: any) => void
  customClass: string
  isMultiple?: boolean
}

export const MemberMultiSelect = (props: MemberMultiSelectProps) => {
  const groupedMembers: MembersGroup[] = useGroupedMembers(props.developerOption)

  const membersTemplate = (option: T) => {
    return (
      <div className="flex align-items-center">
        <div>
          {option.name} ({option.seniority})
        </div>
      </div>
    )
  }

  const showSelectMultiOrSingle = () => {
    return (
      <>
        {
          props.isMultiple ? (
            <MultiSelect
              value={props.value}
              options={groupedMembers}
              onChange={(e) => props.onChange(e)}
              optionLabel="name"
              optionGroupLabel="label"
              optionGroupChildren="items"
              itemTemplate={membersTemplate}
              optionGroupTemplate={GroupItemTemplate}
              display="chip"
              className={`'w-full' ${props.customClass}`}
            />
          ) : (
            <Dropdown
              value={props.value}
              options={groupedMembers}
              onChange={e => props.onChange(e)}
              optionLabel="name"
              optionGroupLabel="label"
              optionGroupChildren="items"
              itemTemplate={membersTemplate}
              optionGroupTemplate={GroupItemTemplate}
              className={`'w-full' ${props.customClass}`}
            />
          )
        }
      </>
    )
  }

  return (
    <div className="flex flex-column justify-content-center">
      <label className="mb-2">{props.label}</label>
      {showSelectMultiOrSingle()}
    </div>
  )
}
