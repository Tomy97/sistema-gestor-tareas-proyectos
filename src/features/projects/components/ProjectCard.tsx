import { Project } from '../../../types/Project'
import { Card } from 'primereact/card'

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const footerProject = (deadline: string) => {
    return (
      <div className="ml-6">
        <span className="font-semibold">
          Fecha límite: {new Date(deadline).toLocaleDateString()}
        </span>
      </div>
    )
  }
  return (
    <Card footer={footerProject(project.date)}
          className="text-primario relative h-9rem">
      <div className="ml-6">
        <h3 className="m-0">
          {project.name}
        </h3>
      </div>
      <div className="background-border-color" style={{ backgroundColor: project.color }}></div>
    </Card>
  )
}
