import { T } from './Generic'
import { Project } from './Project'

export interface DeveloperProject extends T {
  projects: Project[]
}