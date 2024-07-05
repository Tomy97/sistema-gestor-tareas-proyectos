import { T } from './Generic'

export type Task = {
  id: string
  name: string
  description: string
  status: string
  dateCreated: string
  dateUpdated: string
  developerAssigned: T | null
  image?: string
  priority: string
  rol?: string[]
}