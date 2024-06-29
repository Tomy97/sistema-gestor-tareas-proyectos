import { T } from './Generic'
import { Task } from './Task'

export type Project = {
  color: string
  date: string
  id: string
  members: T[]
  name: string
  tasks: Task[]
}