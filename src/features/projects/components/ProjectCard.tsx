import { Project } from '../../../types/Project'
import { Card } from 'primereact/card'

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card title={project.name} className='text-primario'>
      sadjandasdas
    </Card>
  )
}
