import { T } from './Generic'

export type Task = {
  id: string
  name: string
  description: string
  status: string
  dateCreated: Date
  dateUpdated: Date
  developersAssigned: T[]
  image?: string
  rol: string[]
}