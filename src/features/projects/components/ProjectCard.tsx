import { Project } from '../../../types/Project'
import { Card } from 'primereact/card'

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card title={project.name} className="text-primario relative test-title">
      <div className='ml-6'>
          <span className="font-semibold">
            Fecha límite: {new Date(project.date).toLocaleDateString()}
          </span>
      </div>
      <div className="background-border-color" style={{ backgroundColor: project.color }}></div>
    </Card>
  )
}
