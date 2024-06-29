import { T } from './Generic'

export interface MembersGroup {
  label: string
  items: { label: string; value: T }[]
}
