import { Project } from './Project'

export type T = {
  id: string
  name: string
  email: string
  rol: string
  seniority: string
  project?: Project[]
}